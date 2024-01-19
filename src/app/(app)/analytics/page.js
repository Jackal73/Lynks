import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });

  const groupedViews = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: page.uri,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%d",
            },
          },
          count: {
            $count: {},
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]
    // { $order: "-_id" }
  );

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div>
      <SectionBox>
        <h2 className="text-2xl mb-6 text-center font-bold text-[#9b9b9b]">
          Views
        </h2>
        <Chart
          type="line"
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#9b9b9b]">
          Clicks
        </h2>
        {page.links.map((link) => (
          <div
            key={link.title}
            className="md:flex md:text-left text-center gap-4 items-center border-t border-[#3b3b3b] py-4"
          >
            <div className="text-amber-600 pl-4">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="grow">
              <h3 className="text-gray-400">{link.title || "no title"}</h3>
              <p className=" text-sm text-[#7b7b7b]">
                {link.subtitle || "no description"}
              </p>
              <a
                target="_blank"
                href="link.url"
                className="text-xs text-amber-600"
              >
                {link.url}
              </a>
            </div>
            <div className="text-center">
              <div className="border border-[#3b3b3b] bg-[#3b3b3b] rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl text-amber-600">
                  {
                    clicks.filter(
                      (c) => c.uri === link.url && isToday(c.createdAt)
                    ).length
                  }
                  <div className="text-gray-400 text-xs uppercase font-bold">
                    Clicks today
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="border border-[#3b3b3b] bg-[#1f1f1f] rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl text-amber-600">
                  {clicks.filter((c) => c.uri === link.url).length}
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">
                  Clicks total
                </div>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
}
