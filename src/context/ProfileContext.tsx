import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface Profile {
  displayName: string;
  firstName: string;
  lastName: string;
  about: string;
  areaOfInterest: string;
  role: string;
  experience: string;
  expertise: string;
  profilePicture: string;
  manageRole: string;
}

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
