import type { UserProfile } from "@sprintly/shared/schemas";

type ReturnType = {
  status: boolean;
};

// static variables are constant everywhere, even across the instances.

class DB {
  static row: UserProfile[] = [
    // can also use a MAP, if data is huge,
    {
      email: "Gnani@gmail.com",
      password:
        "$argon2id$v=19$m=65536,t=2,p=1$mLhz35UcRludbgscUfRSWTCR3Z3t5N+/d+gCwf0lz9c$Hw1KWqJ8BqfZltQKx1taXgYg7MRFoxawRV5Ry+M1ilc",
      name: "Gnanendra Gariminti",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkduYW5pQGdtYWlsLmNvbSIsImlhdCI6MTc3NzM0Mjk4MywiZXhwIjoxNzc3OTQ3NzgzfQ.Euf_17Dn-b4E117M2vqQeQytbGsqXQHylqyfvQzq_PE",
      // pass: testing123
    },
  ];

  static get(email: string): UserProfile | undefined {
    return this.row.find((obj) => obj.email === email);
  }

  static set(userDetails: UserProfile): ReturnType {
    this.row.push(userDetails);
    return { status: true };
  }

  static put(userDetails: UserProfile): ReturnType {
    let success = false;
    const updatedRows = this.row.map((obj) => {
      if (obj.email === userDetails.email) {
        success = true;
        return { ...obj, ...userDetails };
      }
      return obj;
    });

    this.row = updatedRows;

    return { status: success };
  }

  static getAllItems(): UserProfile[] {
    return this.row;
  }
}

export default DB;
