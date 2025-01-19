import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Profile } from '../Utils/interface';


interface ProfileContextProps {
  profileSave: Profile;
  setProfileSave: React.Dispatch<React.SetStateAction<Profile>>;
}

const defaultProfile: Profile = {
  displayName: '',
  firstName: '',
  lastName: '',
  about: '',
  areaOfInterest: '',
  role: '',
  experience: '',
  expertise: '',
  profilePicture: '',
  manageRole: '',
};

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined,
);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profileSave, setProfileSave] = useState<Profile>(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profileSave));
  }, [profileSave]);

  return (
    <ProfileContext.Provider value={{ profileSave, setProfileSave }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
