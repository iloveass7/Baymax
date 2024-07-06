import React, { useState } from 'react';
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Tabs from "./Tabs";
import { BASE_URL } from "../../config";
import userGetProfile from "../../hooks/useFetchData";
import StarIcon from "../../assets/images/Star.png";
import DoctorAbout from '../../pages/Doctors/DoctorAbout';
import Profile from "./Profile";

const Dashboard = () => {
  const { data, loading, error } = userGetProfile(`${BASE_URL}/doctors/profile/me`);
  const [tab, setTab] = useState('overview');

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && data && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className='lg:col-span-2'>
              {data.isApproved === "pending" && (
                <div className='flex p-4 mb-4 text-yellow-800 bg-white-50 rounded-lg'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 512" className="flex-shrink-0 w-5 h-5">
                    <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                  </svg>
                  <span className='sr-only'>Info</span>
                  <div className='ml-3 text-sm font-medium'>
                    To get approval please complete your profile. We'll review manually and approve within 3 days.
                  </div>
                </div>
              )}
              <div className='mt-8'>
                {tab === "overview" && (
                  <div>
                    <div className='max-w-[200px] max-h-[200px]'>
                      <figure>
                        <img src={data?.photo} alt="" className='w-full' />
                      </figure>
                      <div>
                        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                          {data.specialization} 
                        </span>
                        <h3 className='text-[22px] leading-7 font-bold text-headingColor mt-3'>
                          {data.name}
                        </h3>
                        <div className='flex items-center gap-[6px]'>
                          <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                            <img src={StarIcon} alt="" />
                            {data.averageRating}
                          </span>
                          <span className='text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                          ({data.totalRating})
                          </span>
                        </div>
                        <p className='text_para font-[15px] lg:max-w-[390px] leading-6'>
                          {data?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout name={data.name} about={data.about} qualifications={data.qualifications} experiences={data.experiences} />
                  </div>
                )}
                {tab === "appointments" && <div>Apps</div>}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
