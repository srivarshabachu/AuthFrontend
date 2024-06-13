import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [profileData, setProfileData] = useState({
    email: '',
    dateOfBirth: '',
    city: '',
    phoneNumber: '',
    country: '',
    pincode: '500090',
    isPhysicallyChallenged: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7235/api/Authentication/Get-Profile-Info?username=${username}`);
        setProfile(response.data);
        setProfileData({
          email: response.data.email,
          dateOfBirth: response.data.dateOfBirth,
          city: response.data.city,
          country: response.data.country,
          phoneNumber: response.data.phoneNumber,
          pincode: '500090', // Set default pincode here
          isPhysicallyChallenged: false // Set default value for isPhysicallyChallenged
        });
      } catch (error) {
        console.error('There was an error fetching the profile data!', error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault();
    try {
      // Make the PUT request using Axios
      const savingPromise = axios.put('https://localhost:7235/api/Authentication/UpdateProfile', profileData);
      await toast.promise(savingPromise, {
        loading: 'Saving...',
        success: 'Profile saved!',
        error: 'Error',
      });


      // Optionally, you can perform additional actions after successful update
      // For example, fetch updated profile data again
      const updatedProfile = await axios.get(`https://localhost:7235/api/Authentication/Get-Profile-Info?username=${username}`);
      setProfile(updatedProfile.data);
      setProfileData({
        email: updatedProfile.data.email,
        dateOfBirth: updatedProfile.data.dateOfBirth,
        city: updatedProfile.data.city,
        country: updatedProfile.data.country,
        phoneNumber: updatedProfile.data.phoneNumber,
        pincode: '500090',
        isPhysicallyChallenged: false
      });

    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Error updating profile. Please try again.');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section style={{ fontFamily: 'Gill Sans' }}>

      <form className="max-w-md mx-20" onSubmit={handleProfileInfoUpdate}>
        <img src={profile.profileImage} alt="Profile" style={{ maxWidth: '100px', height: 'auto', width: '100px' }} />
        <div>
          <div className="p-10 rounded-lg text-black">
            <label>
              <input type="file" className="hidden" />
              <span className="center p-2 border rounded-lg cursor-pointer">Edit</span>
            </label>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="grow">
            <input type="text" placeholder="First and last name" value={profile.userName} onChange={ev => setProfile(prevState => ({ ...prevState, userName: ev.target.value }))} />
            <input type="email" disabled={true} placeholder={profile.email} />
            <input
              type="tel"
              placeholder="Phone number"
              value={profileData.phoneNumber ?? ''}
              onChange={ev => setProfileData(prevState => ({ ...prevState, phoneNumber: ev.target.value }))}
            />
            <div className="flex gap-2">
              <input type="text" placeholder="City" value={profileData.city} onChange={ev => setProfileData(prevState => ({ ...prevState, city: ev.target.value }))} />
              <input type="text" placeholder="Postal code" value={profileData.pincode} onChange={ev => setProfileData(prevState => ({ ...prevState, pincode: ev.target.value }))} />
            </div>
            <input type="text" placeholder="Country" value={profileData.country} onChange={ev => setProfileData(prevState => ({ ...prevState, country: ev.target.value }))} />

            <div className="flex flex-col items-center">
              <div className="mb-4">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>
      </form>
    </section>
  );
};

export default Profile;
