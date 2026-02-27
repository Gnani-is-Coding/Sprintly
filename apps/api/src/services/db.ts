import type { UserProfile } from "../types";

type setReturnType = {
  status: boolean;
};

class DB {
  static row: UserProfile[] = [
    // can also use a MAP, if data is huge,
    {
      userName: "Gnani",
      password: "#123",
      fullName: "Gnanendra Gariminti",
    },
  ];

  static get(userName: string): UserProfile | undefined {
    return this.row.find((obj) => obj.userName === userName);
  }

  static set(userDetails: UserProfile): setReturnType {
    this.row.push(userDetails);
    return { status: true };
  }

  static getAllItems(): UserProfile[] {
    return this.row;
  }
}

export default DB;
