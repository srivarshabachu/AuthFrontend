import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [totalClasses, setTotalClasses] = useState(0);
  const [studentMarks, setStudentMarks] = useState([]);
  const [profileData, setProfileData] = useState({
    email: '',
    dateOfBirth: '',
    city: '',
    phoneNumber: '',
    country: '',
    pincode: '500090',
    isPhysicallyChallenged: false,
    marks: 0
  });
  useEffect(() => {
    const fetchStudentMarks = async () => {
      try {
        const response = await axios.get(`https://localhost:7235/api/Authentication/marks`);
        setStudentMarks(response.data); // Assuming response.data is an array of student marks
      } catch (error) {
        console.error('Error fetching student marks:', error);
      }
    };

    fetchStudentMarks();
  }, []); // Empty dependency array to run once on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7235/api/Authentication/Get-Profile-Info?username=${username}`);
        setProfile(response.data);
        console.log(profile)
        setAttendance(response.data.attendance)
        setProfileData({
          email: response.data.email,
          dateOfBirth: response.data.dateOfBirth,
          city: response.data.city,
          country: response.data.country,
          phoneNumber: response.data.phoneNumber,
          pincode: response.data.pincode, // Set default pincode here
          isPhysicallyChallenged: response.data.isPhysicallyChallenged, // Set default value for isPhysicallyChallenged
          marks: response.data.marks
        });
      } catch (error) {
        console.error('There was an error fetching the profile data!', error);
      }
    };
    fetchProfile();
  }, [username]);
  // Colors for the pie chart segments
  const COLORS = ['#78e08f', '#ff6b6b'];
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
  const absent = totalClasses - attendance;

  // Data for the pie chart
  const data = [
    { name: `(${attendance})`, value: attendance * 100 / totalClasses },
    { name: `(${absent})`, value: absent * 100 / totalClasses }
  ];
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex" style={{ fontFamily: 'Gill Sans' }}>

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
      <div>
        <div className='flex justify-center items-center mb-8 gap-8'>
          <PieChart width={350} height={350}>
            <Pie
              data={data}
              dataKey="value"

              cx={200}
              cy={200}
              innerRadius={0}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip />
          </PieChart>

          <div className="flex gap-4 items-center">
            <div className="grow">
              <label>Total number of classes present:</label>
              <input type="text" value={attendance} onChange={ev => setAttendance(ev.target.value)} />
              <label>Total number of classes held:</label>
              <input type="text" value={totalClasses} onChange={ev => setTotalClasses(ev.target.value)} />
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center mb-8'>
          <ResponsiveContainer width="80%" height={350}>
            <LineChart data={studentMarks} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="marks" dot="#f5f6fa" stroke="#f6b93b" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center items-center mb-8">
            <div className="grow">
              <div className="gap-2">
                <label>Total marks:</label>
                <input type="text" placeholder="Total number of classes present" value={profileData.marks} onChange={ev => setProfileData(prevState => ({ ...prevState, marks: ev.target.value }))} />
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default Profile;