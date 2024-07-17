import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({reviews,totalRating}) => {
  const [ showFeedbackForm, setShowFeedbackForm ] = useState(false);

  return (
    <div>
      <div className="mg-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating} )
        </h4>

        {reviews?.map((review,index)=><div key={index} className="flex justify-between ga[-10 mg-[30px]">
          <div className="flex gap-3">
            <figure className="w-10 h-10 rounded-full">
              <img src={review?.user?.photo} className="w-full" alt="" />
            </figure>

            <div>
              <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                {review?.user?.name}
              </h5>
              <p className="text_para mt-3 font-medium text-[15px]">
                {review.reviewText}
              </p>
            </div>
          </div>

          <div className="flex gap-1">
            {[...Array(review?.rating).keys()].map((_, index) => (
              <AiFillStar key={index} color="#0067FF" />
            ))}
          </div>
        </div>
        ) }
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
      
    </div>
  );
};

export default Feedback;
