import { BiMedal } from "react-icons/bi";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { LuBriefcaseBusiness, LuGraduationCap, LuWallet } from "react-icons/lu";
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

      <p className="mt-6 text-lg">Job Overview</p>

      <div className="flex gap-3 my-6 items-center">
        <CiUser className="text-2xl" />
        <div>
          <p className="font-semibold">Job Title</p>
          <p className="text-sm font-thin">{job?.job_title}</p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <GoClock className="text-2xl" />
        <div>
          <p className="font-semibold">Job Type</p>
          <p className="text-sm font-thin">{job?.job_type}</p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <LuBriefcaseBusiness className="text-2xl" />
        <div>
          <p className="font-semibold">Category</p>
          <p className="text-sm font-thin">{job?.job_category}</p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <BiMedal className="text-2xl" />
        <div>
          <p className="font-semibold">Experience Required</p>
          <p className="text-sm font-thin">{job?.experience_required}</p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <LuGraduationCap className="text-2xl" />
        <div>
          <p className="font-semibold">Education Required</p>
          <p className="text-sm font-thin">{job?.education_required}</p>
        </div>
      </div>

      <div className="flex gap-3 my-6 items-center">
        <LuWallet className="text-2xl" />
        <div>
          <p className="font-semibold">Offered Salary</p>
          <p className="text-sm font-thin">$ {job?.offered_salary}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-6 items-center">
        <CiLocationOn className="text-2xl" />
        <div>
          <p className="font-semibold">Location</p>
          <p className="text-sm font-thin">{job?.location.slice(0, 17)}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default JobDetailsSidebar;
