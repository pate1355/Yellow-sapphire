import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function JobDetailsDescriptionCard({ job }) {
  return job && Object.keys(job).length > 0 ? (
    <div className="bg-[#FFF2DE] md:w-full text-black  p-8 flex flex-col gap-2   rounded-[20px] shadow-sm">
      <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
      <br />
      <pre className="mb-6 text-wrap">
        {job?.job_about} {job?.job_overview}
      </pre>
      <h3 className="text-xl font-medium mb-3">Key Responsibilities</h3>
      <pre className="mb-6 text-wrap">{job?.job_responsibilities}</pre>
      <h3 className="text-xl font-medium mb-3">Key Requirements</h3>
      <pre className="mb-6 text-wrap">{job?.job_requirements}</pre>
      <h3 className="text-xl font-medium mb-3">Key Benefits</h3>
      <pre className="mb-6 text-wrap">{job?.job_benefits}</pre>
      <h3 className="text-xl font-medium mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {job?.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#444444] text-white px-3 py-2 rounded-[12px] text-base"
          >
            {tag}
          </span>
        ))}
      </div>

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
