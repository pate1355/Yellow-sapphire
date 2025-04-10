import {
  User,
  Clock,
  BriefcaseBusiness,
  Medal,
  GraduationCap,
  Wallet,
  MapPin,
} from "lucide-react";
import Link from "next/link";

function JobDetailsSidebar({ job }) {
  return job && Object.keys(job).length > 0 ? (
    <div className=" md:w-[15rem] p-8  bg-[#FFF2DE] text-black rounded-[20px] shadow-md">
      <div className="flex-col gap-2 w-full hidden md:flex md:visible">
        <Link
          className="bg-background text-center text-textTitle py-2 rounded-lg"
          href={`/`}
        >
          Apply
        </Link>
      </div>

      <p className="mt-6 text-lg font-bold">Job Overview</p>

      <div className="flex gap-3 my-6 items-center">
        <User />
        <div>
          <p className="font-semibold text-base">Job Title</p>
          <p className="text-base font-normal text-[#6C757D]">
            {job?.job_title}
          </p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <Clock />
        <div>
          <p className="font-semibold text-base">Job Type</p>
          <p className="text-base font-normal text-[#6C757D]">
            {job?.job_type}
          </p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <BriefcaseBusiness />
        <div>
          <p className="font-semibold text-base">Category</p>
          <p className="text-base font-normal text-[#6C757D]">
            {job?.job_category}
          </p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <Medal />
        <div>
          <p className="font-semibold text-base">Experience</p>
          <p className="text-base font-normal text-[#6C757D]">
            {job?.experience_required}
          </p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <GraduationCap />
        <div>
          <p className="font-semibold text-base">Education</p>
          <p className="text-base font-normal text-[#6C757D]">
            {job?.education_required}
          </p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <Wallet />
        <div>
          <p className="font-semibold text-base">Offered Salary</p>
          <p className="text-base font-normal text-[#6C757D]">
            $ {job?.offered_salary}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6 items-center">
        <MapPin />
        <div>
          <p className="font-semibold text-base">Location</p>
          <p className="text-base font-normal text-[#6C757D]">
            {job?.location.slice(0, 17)}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default JobDetailsSidebar;
