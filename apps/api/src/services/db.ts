import type { UserProfile } from "@sprintly/shared";

type setReturnType = {
  status: boolean;
};

// static variables are constant everywhere, even across the instances.

class DB {
  static row: UserProfile[] = [
    // can also use a MAP, if data is huge,
    {
      userName: "Gnani",
      password:
        "$argon2id$v=19$m=65536,t=2,p=1$hXiFqxHd4rcw6BB5YjnFUdCJvID9xRPmU5TFQvoXUms$pCMxrucchaX498kn3frOiX2zSwTFzGUFEDgC2REnKsM",
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
