import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
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
    axios.get(`https://localhost:7235/api/Authentication/Get-Profile-Info?username=${username}`)
      .then(response => {
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
      })
      .catch(error => {
        console.error('There was an error fetching the profile data!', error);
      });
  }, [username]);

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault();

    console.log(profileData)
    await axios.put('https://localhost:7235/api/Authentication/UpdateProfile', profileData
    ).then((response) => { console.log(response) })
      .catch((error) => {


        console.error('Error occurred:', error);

      });;


  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section style={{ fontFamily: 'Gill Sans' }}>
      <form className="max-w-md mx-20" onSubmit={handleProfileInfoUpdate}>
        <img src alt="Profile" style={{ maxWidth: '100px', height: 'auto', width: '100px' }} />
        <div>
          <div className="p-10 rounded-lgtext-black">
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

            <div class="flex flex-col items-center">
              <div class="mb-4">
                <button type="submit" class="bg-blue-500 text-white  py-2 px-4 rounded">
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
