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

      // Calculate salary percentage change compared to last week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const premiumUsersLastWeek = await UserModel.countDocuments({
        role: "premiumUser",
        createdAt: { $lt: oneWeekAgo },
      });

      const salaryLastWeek = premiumUsersLastWeek * 200;
      let salaryPercentageChange = 0;

      if (salaryLastWeek > 0) {
        salaryPercentageChange =
          ((totalSalary - salaryLastWeek) / salaryLastWeek) * 100;
      } else if (totalSalary > 0) {
        salaryPercentageChange = 100;
      }

      return {
        totalMembers,
        totalUsers,
        totalPremiumUsers,
        totalJournals,
        totalSalary,
        salaryPercentageChange: parseFloat(salaryPercentageChange.toFixed(2)),
      };
    },
    getUsersWithStats: async (_: any, args: any, context: Context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const { limit = 10, offset = 0 } = args;

      const users = await UserModel.find({
        role: { $in: ["user", "premiumUser"] },
      });
      const journals = await JournalModel.find();

      const journalsByUserId: Record<string, Journal[]> = journals.reduce(
        (acc: any, journal) => {
          if (!acc[journal.userId]) {
            acc[journal.userId] = [];
          }
          acc[journal.userId].push(journal);
          return acc;
        },
        {}
      );

      const usersWithStats = users.map((user) => {
        const userJournals = journalsByUserId[user._id.toString()] || [];

        const journalCount = userJournals.length;

        const lastJournalDate =
          userJournals.length > 0
            ? userJournals.sort(
                (a: Journal, b: Journal) =>
                  b.updatedAt.getTime() - a.updatedAt.getTime()
              )[0].updatedAt
            : null;

        const tags = userJournals.flatMap((j: Journal) =>
          j.tag.filter((t: any) => t.selected).map((t: any) => t.name)
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

      const totalCount = usersWithStats.length;
      const paginatedUsers = usersWithStats.slice(offset, offset + limit);

      return {
        users: paginatedUsers,
        totalCount,
      };
    },
  },
};
