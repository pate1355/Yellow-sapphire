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
      console.log("🔍 Searching for real jobs...");
      if (!query) {
        return NextResponse.json(
          { error: "Query parameter is required" },
          { status: 400 }
        );
      }

      // Searching for jobs with 'query' in job_title or company_name
      const { data: realData, error: realError } = await supabase
        .from("job_post_data")
        .select("*")
        .or(`job_title.ilike.%${query}%,company_name.ilike.%${query}%`);

      data = realData;
      console.log("✅ Found real jobs:", data.length);
      error = realError;
    } else if (local) {
      console.log("🔍 Searching for local jobs...");
      if (!query) {
        return NextResponse.json(
          { error: "Query parameter is required" },
          { status: 400 }
        );
      }

      // Searching for jobs with 'query' in job_title or company_name, limiting to 10 results
      const { data: localData, error: localError } = await supabase
        .from("job_post_data")
        .select("*")
        .or(`job_title.ilike.%${query}%,company_name.ilike.%${query}%`)
        .limit(10);

      data = localData;
      console.log("✅ Found local jobs:", data.length);

      error = localError;
    } else if (random) {
      console.log("🔍 Searching for random jobs...");

      // Selecting all jobs and manually shuffling them
      const { data: allJobs, error: randomError } = await supabase
        .from("job_post_data")
        .select("*")
        .limit(10);
      // Randomly select 10 jobs from the database

      data = allJobs;
      console.log("✅ Found random jobs:", data.length);
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

    // 🏷 Efficiently count job types using reduce()
    const jobCounts = data.reduce(
      (acc, job) => {
        const type = job.job_type; // Get the job_type from the database
        const experience = job.experience_required; // Get the experience_required from the database
        const category = job.job_category; // Get the job_category from the database

        // Sort date

        // Mapping job types to the desired keys
        const typeMapping = {
          "Full Time": "full_time",
          "Part Time": "part_time",
          Contract: "contract",
          Internship: "internship",
          Remote: "remote",
          Temporary: "temporary",
        };

        // Mapping experience levels to the desired keys
        const experienceMapping = {
          "Entry Level": "entry_level",
          Intermediate: "intermediate",
          Expert: "expert",
        };

        // Mapping job categories to the desired keys (snake_case format)
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

        // If the job_type exists in the typeMapping, increment the count
        if (typeMapping[type]) {
          acc[typeMapping[type]] = (acc[typeMapping[type]] || 0) + 1;
        }

        // If the experience_required exists in the experienceMapping, increment the count
        if (experienceMapping[experience]) {
          acc[experienceMapping[experience]] =
            (acc[experienceMapping[experience]] || 0) + 1;
        }

        // If the job_category exists in the categoryMapping, increment the count
        if (categoryMapping[category]) {
          acc[categoryMapping[category]] =
            (acc[categoryMapping[category]] || 0) + 1;
        }

        return acc;
      },
      {
        // Initialize the counts for each key
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

    console.log("✅ Job counts:");

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
