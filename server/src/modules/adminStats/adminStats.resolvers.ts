import { UserModel } from "../users/userSchema";
import { JournalModel } from "../journal/journalSchema";
import { Context } from "../../utils/authContext";
import { Journal } from "../journal/journalSchema";

export const adminStatsResolvers = {
  Query: {
    getAdminStats: async (_: any, __: any, context: Context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const totalUsers = await UserModel.countDocuments({ role: "user" });
      const totalPremiumUsers = await UserModel.countDocuments({
        role: "premiumUser",
      });
      const totalMembers = totalUsers + totalPremiumUsers;

      const totalJournals = await JournalModel.countDocuments();

      const totalSalary = totalPremiumUsers * 200;

      return {
        totalMembers,
        totalUsers,
        totalPremiumUsers,
        totalJournals,
        totalSalary,
      };
    },
    getUsersWithStats: async (_: any, __: any, context: Context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const users = await UserModel.find({
        role: { $in: ["user", "premiumUser"] },
      });
      const journals = await JournalModel.find();

      const journalsByUserId = journals.reduce((acc, journal) => {
        if (!acc[journal.userId]) {
          acc[journal.userId] = [];
        }
        acc[journal.userId].push(journal);
        return acc;
      }, {} as Record<string, Journal[]>);

      const usersWithStats = users.map((user) => {
        const userJournals = journalsByUserId[user._id] || [];

        const journalCount = userJournals.length;

        const lastJournalDate =
          userJournals.length > 0
            ? userJournals.sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
              )[0].createdAt
            : null;

        const tags = userJournals.flatMap((j) =>
          j.tag.filter((t) => t.selected).map((t) => t.name)
        );
        const tagCounts: Record<string, number> = {};
        for (const tagName of tags) {
          tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
        }

        const tagUsage = Object.entries(tagCounts).map(([name, count]) => ({
          name,
          count,
        }));

        return {
          _id: user._id,
          username: user.username,
          journalCount,
          tags: tagUsage,
          lastJournalDate: lastJournalDate
            ? lastJournalDate.toISOString()
            : null,
          createdAt: user.createdAt?.toISOString(),
        };
      });

      return usersWithStats;
    },
  },
};
