import englishMessages from "ra-language-english";

const allEnglishMessages = {
  ...englishMessages,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  menu: {
    user: "Users",
    UserRelation: "User Relations",
    Group: "Groups",
    Flow: "Cash Flow",
    Attendance: "Attendance",
    Enrolment: "Enrolments",
    Request: "Requests",
    Post: "Posts",
    Video: "Videos",
    Employee: "Employees",
    settings: "Settings",
    wallet: "Wallet",
    profile: "Profile",
    restPassword: "Reset Password",
    settlement: "Settlement",
    search: "Search",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  other: {
    dark: "Dark Mode",
    light: "Light Mode",
    notifications: "Notifications",
    invalid: "Invalid",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  weekDays: {
    sat: "Saturday",
    sun: "Sunday",
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  resources: {
    // user: {
    //   name: "Users |||| User",
    //   fields: {
    //     id: "الكود",
    //     name: "الاسم",
    //     userType: "الدور",
    //     email: "البريد الإلكتروني",
    //     password: "كلمة المرور",
    //     permission: "الصلاحيات",
    //     info: "معلومات المستخدم",
    //     createdAt: "تاريخ الإنشاء",
    //     updatedAt: "تاريخ التعديل",
    //   },
    // },
    // userrelation: {
    //   name: "علاقات المستخدم |||| علاقة المستخدم",
    //   fields: {
    //     followingId: "كود المستخدم",
    //     followerId: "كود المتابع",
    //     userRelationType: "نوع العلاقة",
    //     createdAt: "تاريخ الإنشاء",
    //     updatedAt: "تاريخ التعديل",
    //   },
    // },
    user: {
      fields: {
        name: "Name",
        email: "Email",
        userType: "User Type",
        role: "Role",
        create: "Create",
        centerEmployee: "Center Employee",
        teacherAssistant: "Teacher Assistant",
        id: "ID",
        videoUsageStorage: "Video Usage Storage",
        permission: "Permission",
        oldPassword: "Old Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        changePassword: "Change Password",
        SucessfullyChangedPassword: "Sucessfully Changed Password",
      },
    },
    userProfile: {
      fields: {
        work: "Work",
        skills: "Skills",
        followers: "Followers",
        following: "Following",
        videos: "Videos",
        since: "Since",
        email: "E-mail",
        phone: "Phone",
        address: "Address",
        birthday: "Birthday",
        gender: "Gender",
        about: "About",
        contactInformation: "Contact Information",
        basicInformation: "Basic Information",
      },
    },
    settlement: {
      fields: {
        id: "ID",
        email: "Email",
        since: "Since",
        videoUsageStorage: "Video Usage Storage",
      },
    },
    wallet: {
      fields: {
        from: "From",
        to: "To",
        amount: "Amount",
        description: "Description",
        group: "Group",
        sendMoney: "Send Money",
        lastTransactions: "Last Transactions",
        debit: "Debit",
        credited: "Credited",
      },
    },
    search: {
      fields: {
        type: "Type",
        level: "Level",
        groupsYouCanJoin: "Groups You Can Join",
        close: "Close",
        courseName: "Course Name",
        level: "Level",
        payment: "Payment",
        type: "Type",
        location: "Location",
        id: "ID",
      },
    },
    post: {
      name: "post",
      fields: {
        id: "id",
        shareWithYourGroup: "shareWith Your Group",
        shareWithYourFollowers: "shareWith Your Followers",
        comments: "comments",
        likes: "likes",
      },
    },
    group: {
      name: "group |||| groups",
      fields: {
        id: "Code",
        courseName: "Course Name",
        ownerUserId: "Owner Code",
        teacherUserId: "Teacher Code",
        groupType: "Group Type",
        paymentType: "Payment Type",
        centerCostPerLecture: "Center Cost per Lecture",
        public: "Public",
        lectures: "Lectures",
        dates: "Weekly Dates",
        exams: "Exams",
        createdAt: "Created at",
        updatedAt: "Updated at",
      },
      groupType: {
        InPerson: "In Person",
        Online: "Online",
        Hypred: "Hypred",
      },
      paymentType: {
        Lecture: "Lecture",
        Month: "Month",
        Installment: "Installment",
      },
      paymentCostlabel: {
        Lecture: "Lecture cost",
        Month: "Month cost",
        Installment: "Total installments cost",
      },

      labels: {
        numberOfLectures: "Lectures per Month",
        teacher: "Teacher",
        weeklyDates: "Weekly Dates",
        day: "Day",
        from: "From",
        to: "To",
        partial: "Partial",
        done: "Done",
        none: "None",
        homeworkNotes: "Homework Notes",
        homework: "Homework",
        payment: "Payment",
        lectureNumber: "Lecture Number",
        SelectGroup: "please Select Group",
        studentCode: "Student Code",
        sale: "Sale",
        normal: "Normal",
      },
    },
    uploadVideo: {
      name: "uploadVideo |||| uploadVideos",
      fields: {
        tittle: "Tittle",
        lectureNumber: "Lecturer Number",
        importVideo: "Import Video",
        importOtherVideo: "Import Other Video",
        uploadVideo: "Upload Video",
        videoSize: "video size should be less than 2GB",
        lectureDate: "Lecture Date",
        edit: "Edit",
        delete: "Delete",
        show: "Show",
        groupNumber: "GroupNo",
        description: "Description",
        uploadNewvideo: "Upload New Video",
        clickHereToWatchThisVideo: "Click Here To Watch This Video",
      },
    },
    menuTab: {
      timeline: "Timeline",
      takeAttendance: "Take Attendance",
      attendanceRecord: "Attendance Record",
      enrolment: "Enrolment",
      importMaterial: "Import Material",
      live: "Live",
      liveVideo: "start live",
      settings: "Settings",
      videos: "Videos",
      groupflow: "Group Flow",
    },
    request: {
      name: "Requests ",
      fields: {
        id: "ID",
        ago: "Ago",
        payment: "Payment",
        teacher: "Teacher",
        status: "Status",
        studentId: "Student ID",
        course: "Course",
        student: "Student",
      },
    },
  },

  no: "No",
  records: "Records",
};
export default allEnglishMessages;
