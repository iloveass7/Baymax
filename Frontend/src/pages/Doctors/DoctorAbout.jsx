import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/formatDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text_para">
          {about}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5 rounded-lg bg-white">
          {qualifications?.map((item, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] p-4 rounded-lg bg-gray-100">
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-textColor flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 rounded-lg bg-white">
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded-lg bg-yellow-100">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
