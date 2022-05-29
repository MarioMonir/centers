import englishMessages from "ra-language-english";

const allEnglishMessages = {
  ...englishMessages,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  menu: {
    User: "Users",
    UserRelation: "User Relations",
    Group: "Groups",
    Flow: "Cash Flow",
    Attendance: "Attendance",
    Enrolment: "Enrolments",
    Request: "Requests",
    Post: "Posts",
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
    group: {
      name: "group |||| groups",
      fields: {
        id: "Code",
        courseName:"Course Name",
        ownerUserId: "Owner Code",
        teacherUserId: "Teacher Code",
        groupType: "Group Type",
        paymentType: "Payment Type",
        centerCostPerLecture:"Center Cost per Lecture",
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
        numberOfLectures:"Lectures per Month",
        teacher: "Teacher",
        weeklyDates: "Weekly Dates",
        day: "Day",
        from: "From",
        to: "To",
      },
    },
    //   flow: {
    //     name: "معاملات مالية |||| معاملة مالية",
    //     fields: {
    //       id: "الكود",
    //       fromUserId: "من المستخدم",
    //       toUserId: "الى المستخدم",
    //       balance: "المبلغ",
    //       notes: "ملاحظات",
    //       createdAt: "تاريخ الإنشاء",
    //       updatedAt: "تاريخ التعديل",
    //     },
    //   },
    //   attendance: {
    //     name: "تسجلات حضور |||| تسجيل حضور",
    //     fields: {
    //       id: "الكود",
    //       groupId: "كود المجموعة",
    //       studentId: "كود الطالب",
    //       homework: "الواجب",
    //       notes: "ملاحظات",
    //       createdAt: "تاريخ الإنشاء",
    //       updatedAt: "تاريخ التعديل",
    //     },
    //   },
    //   enrolment: {
    //     name: "تسجلات مواد |||| تسجيل مادة",
    //     fields: {
    //       groupId: "كود المجموعة",
    //       studentId: "كود الطالب",
    //       lectureCost: "تكلفة الحصة",
    //       centerCost: "تكلفة المركز الدراسي",
    //       balance: "رصيد المادة",
    //       exams: "الامتحانات",
    //       createdAt: "تاريخ الإنشاء",
    //       updatedAt: "تاريخ التعديل",
    //     },
    //   },
    //   request: {
    //     name: "طلبات مقدمة |||| طلب مقدم",
    //     fields: {
    //       id: "الكود",
    //       fromUserId: "من المستخدم",
    //       toUserId: "الى المستخدم",
    //       requestType: "نوع الطلب",
    //       requestStatus: "حالة الطلب",
    //       note: "ملحوظة",
    //       info: "معلومات",
    //       createdAt: "تاريخ الإنشاء",
    //       updatedAt: "تاريخ التعديل",
    //     },
    //   },
    //   post: {
    //     name: "منشورات |||| منشور",
    //     fields: {
    //       id: "الكود",
    //       content: "المحتوى",
    //       likes: "عدد الإعجابات",
    //       comments: "التعليقات",
    //       userId: "كود المستخدم",
    //       createdAt: "تاريخ الإنشاء",
    //       updatedAt: "تاريخ التعديل",
    //     },
    //   },
  },
};
export default allEnglishMessages;
