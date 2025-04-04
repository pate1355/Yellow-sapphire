import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseDB";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const real = searchParams.get("real");
    const local = searchParams.get("local");
    const random = searchParams.get("random");
    const query = searchParams.get("query");

    let data, error;

    if (real) {
      if (!query) {
        return NextResponse.json(
          { error: "Query parameter is required" },
          { status: 400 }
        );
      }

      const { data: realData, error: realError } = await supabase
        .from("job_post_data")
        .select("*")
        .or(`job_title.ilike.%${query}%,company_name.ilike.%${query}%`);

      data = realData;

      error = realError;
    } else if (local) {
      if (!query) {
        return NextResponse.json(
          { error: "Query parameter is required" },
          { status: 400 }
        );
      }

      const { data: localData, error: localError } = await supabase
        .from("job_post_data")
        .select("*")
        .or(`job_title.ilike.%${query}%,company_name.ilike.%${query}%`)
        .limit(10);

      data = localData;

      error = localError;
    } else if (random) {
      const { data: allJobs, error: randomError } = await supabase
        .from("job_post_data")
        .select("*")
        .limit(10);

      data = allJobs;

      error = randomError;
    } else {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch jobs", details: error.message },
        { status: 500 }
      );
    }

    const jobCounts = data.reduce(
      (acc, job) => {
        const type = job.job_type;
        const experience = job.experience_required;
        const category = job.job_category;

        const typeMapping = {
          "Full Time": "full_time",
          "Part Time": "part_time",
          Contract: "contract",
          Internship: "internship",
          Remote: "remote",
          Temporary: "temporary",
        };

        const experienceMapping = {
          "Entry Level": "entry_level",
          Intermediate: "intermediate",
          Expert: "expert",
        };

        const categoryMapping = {
          "Technology & IT": "technology_it",
          "Healthcare & Medical": "healthcare_medical",
          Engineering: "engineering",
          "Business & Finance": "business_finance",
          "Marketing & Sales": "marketing_sales",
          "Customer Service": "customer_service",
          "Education & Training": "education_training",
          "Construction & Trades": "construction_trades",
          "Transportation & Logistics": "transportation_logistics",
          "Hospitality & Tourism": "hospitality_tourism",
          "Art & Design": "art_design",
          Legal: "legal",
          "Science & Research": "science_research",
          "Manufacturing & Production": "manufacturing_production",
          Retail: "retail",
          "Writing & Communication": "writing_communication",
          "Government & Public Sector": "government_public_sector",
          "Non-profit & Charity": "nonprofit_charity",
        };

        if (typeMapping[type]) {
          acc[typeMapping[type]] = (acc[typeMapping[type]] || 0) + 1;
        }

        if (experienceMapping[experience]) {
          acc[experienceMapping[experience]] =
            (acc[experienceMapping[experience]] || 0) + 1;
        }

        if (categoryMapping[category]) {
          acc[categoryMapping[category]] =
            (acc[categoryMapping[category]] || 0) + 1;
        }

        return acc;
      },
      {
        full_time: 0,
        part_time: 0,
        contract: 0,
        internship: 0,
        remote: 0,
        temporary: 0,
        entry_level: 0,
        intermediate: 0,
        expert: 0,
        technology_it: 0,
        healthcare_medical: 0,
        engineering: 0,
        business_finance: 0,
        marketing_sales: 0,
        customer_service: 0,
        education_training: 0,
        construction_trades: 0,
        transportation_logistics: 0,
        hospitality_tourism: 0,
        art_design: 0,
        legal: 0,
        science_research: 0,
        manufacturing_production: 0,
        retail: 0,
        writing_communication: 0,
        government_public_sector: 0,
        nonprofit_charity: 0,
      }
    );

    return NextResponse.json(
      {
        jobs: data,
        jobCounts,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("🚨 Server error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
