import React, { useState,useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL,token } from "./../../config";
import { toast } from "react-toastify";
const Profile = ({doctorData}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        //passowrd:'',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots:[],
        photo: null,
        about: '',
    });

    useEffect(() => {
        if (doctorData) {
          setFormData({
            name: doctorData.name || '',
            email: doctorData.email || '',
            //password: '', // Password should be handled separately and securely
            phone: doctorData.phone || '',
            bio: doctorData.bio || '',
            gender: doctorData.gender || '',
            specialization: doctorData.specialization || '',
            ticketPrice: doctorData.ticketPrice || 0,
            qualifications: doctorData.qualifications || [],
            experiences: doctorData.experiences || [],
            timeSlots: doctorData.timeSlots || [],
            photo: doctorData.photo  || null,
            about: doctorData.about || '',
          });
        }
      }, [doctorData]);
 
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
    
        const data = await uploadImageToCloudinary(file);
    
        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
      };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json();
            if(!res.ok){
                throw Error();
            }

            toast.success("Profile updated successfully");
        }catch(err){
            toast.error(err.message)
        }
    };

    const addItem = (key, item) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: [...prevFormData[key], item]
        }));
    };
    
    const handleResusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            const updatedItems = prevFormData[key].map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            );
            return {
                ...prevFormData,
                [key]: updatedItems
            };
        });
    };
    const deleteItem = (key,index) =>{
        setFormData(prevFormData => ({ ... prevFormData,[key]: prevFormData[key].filter((_,i)=>i!==index)}))
    } 

    const addQualification = e => {
        e.preventDefault();
        addItem("qualifications", {
            startingDate: '',
            endingDate: '',
            degree: '',
            university: '',
        });
    };

    const handleQualificationChange = (index, e) => {
        handleResusableInputChangeFunc("qualifications", index, e);
    };
    const deleteQualification = (e,index) => {
        e.preventDefault();
        deleteItem('qualifications',index);
    };

    const addExperience = (e) => {
        e.preventDefault();
        addItem("experiences", {
            startingDate: '',
            endingDate: '',
            position: '',
            hospital: ''
        });
    };

    const handleExperienceChange = (index, e) => {
        handleResusableInputChangeFunc("experiences", index, e);
    };

    const deleteExperience = (index, e) => {
        e.preventDefault();
        setFormData(prevFormData => {
            const updatedExperiences = prevFormData.experiences.filter((_, i) => i !== index);
            return {
                ...prevFormData,
                experiences: updatedExperiences
            };
        });
    };
    
    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem("timeSlots", {
            day: '',
            startingTime: '',
            endingTime: ''
        });
    };

    const handleTimeSlotChange = (index, e) => {
        handleResusableInputChangeFunc("timeSlots", index, e);
    };
    
    const deleteTimeSlot = (index, e) => {
        e.preventDefault();
        setFormData(prevFormData => {
            const updatedTimeSlots = prevFormData.timeSlots.filter((_, i) => i !== index);
            return {
                ...prevFormData,
                timeSlots: updatedTimeSlots
            };
        });
    };
    
    
    

    return (
        <div>
            <h2 className="text-headingColor font-bold text-24px leading-9 mb-10">
                Profile Information
            </h2>
            <form>
                <div className="mb-5">
                    <p className="form_label">Name*</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="form_input border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Email*</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form_input border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Phone*</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        className="form_input border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-5">
                    <p className="form_label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        className="form_input border border-gray-300 rounded px-3 py-2"
                        maxLength={100}
                    />
                </div>
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <div>
                        <p className="form_label">Gender*</p>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="form_input border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div>
                        <p className="form_label">Specialization*</p>
                        <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="form_input border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Psychiatrist">Psychiatrist</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="form_label">Qualifications*</p>
                    {formData.qualifications.map((item, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form_label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Starting Date"
                                        onChange={e => handleQualificationChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Ending Date"
                                        onChange={e => handleQualificationChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">Degree*</p>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={item.degree}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Degree"
                                        onChange={e => handleQualificationChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">University*</p>
                                    <input
                                        type="text"
                                        name="university"
                                        value={item.university}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="University"
                                        onChange={e => handleQualificationChange(index, e)}
                                    />
                                </div>
                            </div>
                            <button onClick={e=>deleteQualification(e,index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button onClick={addQualification} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                        Add Qualification
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form_label">Experiences*</p>
                    {formData.experiences.map((item, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form_label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Starting Date"
                                        onChange={e => handleExperienceChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Ending Date"
                                        onChange={e => handleExperienceChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">Position*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Position"
                                        onChange={e => handleExperienceChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">Hospital*</p>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        placeholder="Hospital"
                                        onChange={e => handleExperienceChange(index, e)}
                                    />
                                </div>
                            </div>
                            <button onClick={e=> deleteExperience(index,e)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button onClick={addExperience} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                        Add Experience
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form_label">Time Slots*</p>
                    {formData.timeSlots.map((item, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                <div>
                                    <p className="form_label">Day*</p>
                                    <select
                                        name="day"
                                        value={item.day}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        onChange={e => handleTimeSlotChange(index, e)}
                                    >
                                        <option value="">Select</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="form_label">Starting Time*</p>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        onChange={e => handleTimeSlotChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <p className="form_label">Ending Time*</p>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime}
                                        className="form_input border border-gray-300 rounded px-3 py-2"
                                        onChange={e => handleTimeSlotChange(index, e)}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <button onClick={e => deleteTimeSlot(index, e)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mb-[30px] cursor-pointer mt-6">
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
                        Add Time Slot
                    </button>
                </div>
                <div className="mb-5">
                    <p className="form_label">About*</p>
                    <textarea
                        name="about"
                        rows={5}
                        cols={80}
                        value={formData.about}
                        placeholder="Write About Yourself"
                        onChange={handleInputChange}
                        className="form_input border border-gray-300 rounded px-3 py-2"
                    ></textarea>
                </div>
                <div className="mb-5 flex item-center gap-3">
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img
                                src={formData.photo}
                                alt=""
                                className="w-full rounded-full"
                            />
                        </figure>
                    )}
                    <div className="relative w-[130px] h-[50px]">
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            onChange={handleFileInputChange}
                            accept=".jpg, .png"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                            htmlFor="customFile"
                            className="absolute top-0 left-0 w-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer"
                        >
                            Upload Photo
                        </label>
                    </div>
                </div>
                <div className="mt-7">
                    <button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg ">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
