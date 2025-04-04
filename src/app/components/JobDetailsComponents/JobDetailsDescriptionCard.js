import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function JobDetailsDescriptionCard({ job }) {
  return job && Object.keys(job).length > 0 ? (
    <div className="bg-[#FFF2DE] md:w-full text-black  p-8 flex flex-col gap-4   rounded-[20px] shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Job Description</h2>
      <br />
      <pre className="mb-6 text-wrap">{job?.job_description}</pre>

      <div className="flex items-center justify-start gap-6 mt-6">
        <p className="font-bold">Share Job:</p>
        <a href="./">
          <FaFacebook style={{ height: 30, width: 30 }} />
        </a>
        <a href="./">
          <FaXTwitter style={{ height: 30, width: 30 }} />
        </a>
        <a href="./">
          <FaLinkedin style={{ height: 30, width: 30 }} />
        </a>
      </div>
    </div>
  ) : (
    <></>
  );
}
