import { UserProfile } from "@/types/database/table.types";
import { getUserByProfileId } from "./database.service";

export const fetchUsers = async (
    profileIds: string[],
  ): Promise<Record<string, UserProfile>> => {
    const usersData: Record<string, UserProfile> = {};

    const usersFetched = await Promise.all(
      profileIds.map(async (id) => {
        try {
          const userData = await getUserByProfileId(id);
          return { id, data: userData[0] };
        } catch (error) {
          console.error(`Error fetching user with profile_id ${id}`, error);
          return null;
        }
      }),
    );

    usersFetched.forEach((user) => {
      if (user) usersData[user.id] = user.data;
    });

    return usersData;
  };