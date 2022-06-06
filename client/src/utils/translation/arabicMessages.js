const arabicMessages = {
  menu: {
    User: "المستخدمين",
    UserRelation: "علاقات المستخدم",
    Group: "المجموعات",
    Flow: "سجل الحسابات",
    Attendance: "سجل الحضور",
    Enrolment: "تسجيلات المادة",
    Request: "الطلبات المقدمة",
    Post: "المنشورات",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  other: {
    dark: "الوضع المعتم",
    light: "الوضع الفاتح",
    notifications: "الاشعارات",
    invalid: "غير مقبول",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  weekDays: {
    sat: "السبت",
    sun: "الأحد",
    mon: "الأثنين",
    tue: "الثلاثاء",
    wed: "الأربعاء",
    thu: "الخميس",
    fri: "الجمعة",
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  resources: {
    user: {
      name: "مستخدمين |||| مستخدم",
      fields: {
        id: "الكود",
        name: "الاسم",
        userType: "الدور",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        permission: "الصلاحيات",
        info: "معلومات المستخدم",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
    userrelation: {
      name: "علاقات المستخدم |||| علاقة المستخدم",
      fields: {
        followingId: "كود المستخدم",
        followerId: "كود المتابع",
        userRelationType: "نوع العلاقة",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
    group: {
      name: "مجموعات |||| مجموعة",
      fields: {
        id: "الكود",
        courseName: "المادة الدراسية",
        level: "الصف الدراسي",
        groupType: "نظام التدريس",
        ownerUserId: "كود مُنشئ المجموعة",
        teacherId: "كود المدرس",
        collectorUserId: "كود المُحصِّل",
        paymentType: "طريقة الدفع",
        paymentCost: "التكلفة",
        centerCostPerLecture: "تكلفة السنتر في الحصة",
        location: "المكان",
        public: "عام",
        lectures: "الحصص",
        dates: "المواعيد",
        exams: "الامتحانات",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
      groupType: {
        InPerson: "حضور",
        Online: "اونلاين",
        Hypred: "هجين",
      },
      paymentType: {
        Lecture: "حصة",
        Month: "شهر",
        Installment: "دفعات",
      },
      paymentCostlabel: {
        Lecture: "تكلفة الحصة",
        Month: "تكلفة الشهر",
        Installment: "تكلفة اجمالي الدفعات",
      },
      labels: {
        numberOfLectures: "عدد الحصص في الشهر",
        teacher: "المدرس",
        weeklyDates: "المواعيد الاسبوعية",
        day: "اليوم",
        from: "من",
        to: "الى",
      },
    },
    flow: {
      name: "معاملات مالية |||| معاملة مالية",
      fields: {
        id: "الكود",
        fromUserId: "من المستخدم",
        toUserId: "الى المستخدم",
        balance: "المبلغ",
        notes: "ملاحظات",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
    attendance: {
      name: "تسجلات حضور |||| تسجيل حضور",
      fields: {
        id: "الكود",
        groupId: "كود المجموعة",
        studentId: "كود الطالب",
        homework: "الواجب",
        notes: "ملاحظات",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
    enrolment: {
      name: "تسجلات مواد |||| تسجيل مادة",
      fields: {
        groupId: "كود المجموعة",
        studentId: "كود الطالب",
        lectureCost: "تكلفة الحصة",
        centerCost: "تكلفة المركز الدراسي",
        balance: "رصيد المادة",
        exams: "الامتحانات",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
    request: {
      name: "طلبات مقدمة |||| طلب مقدم",
      fields: {
        id: "الكود",
        fromUserId: "من المستخدم",
        toUserId: "الى المستخدم",
        requestType: "نوع الطلب",
        requestStatus: "حالة الطلب",
        note: "ملحوظة",
        info: "معلومات",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
    post: {
      name: "منشورات |||| منشور",
      fields: {
        id: "الكود",
        content: "المحتوى",
        likes: "عدد الإعجابات",
        comments: "التعليقات",
        userId: "كود المستخدم",
        createdAt: "تاريخ الإنشاء",
        updatedAt: "تاريخ التعديل",
      },
    },
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ra: {
    action: {
      add_filter: "إضافة فلتر",
      add: "إضافة",
      back: "العودة",
      bulk_actions: "%{smart_count} العناصر المحددة",
      cancel: "إلغاء",
      clear_input_value: "إفراغ المدخلات",
      clone: "استنساخ",
      confirm: "تأكيد",
      create: "إنشاء",
      create_item: "إنشاء %{item}",
      delete: "حذف",
      edit: "تعديل",
      export: "تصدير",
      list: "قائمة",
      refresh: "إعادة تحميل",
      remove_filter: "إزالة هذا الفلتر",
      remove: "إزالة",
      save: "حفظ",
      search: "بحث",
      show: "عرض التفاصيل",
      sort: "فرز",
      undo: "تراجع",
      unselect: "الغاء التحديد",
      expand: "فرد",
      close: "اغلاق",
      open_menu: "افتح القائمة",
      close_menu: "اغلق القائمة",
    },
    boolean: {
      true: "نعم",
      false: "لا",
      null: "",
    },
    page: {
      create: "إنشاء %{name}",
      dashboard: "لوحة الإحصائيات",
      edit: "%{name} #%{id}",
      error: "هناك خطأ ما",
      list: "%{name}",
      loading: "جار التحميل",
      not_found: "غير موجود",
      show: "%{name} #%{id}",
      empty: "لا يوجد %{name} حتي الان",
      invite: "هل ترغب فى الاضافة ؟",
    },
    input: {
      file: {
        upload_several: "إسقاط بعض الملفات للتحميل، أو انقر لتحديد واحد.",
        upload_single: "إسقاط ملف للتحميل، أو انقر لتحديده.",
      },
      image: {
        upload_several: "قم بإسقاط بعض الصور للتحميل، أو انقر لتحديد واحدة.",
        upload_single: "إسقاط صورة للتحميل، أو انقر لتحديدها.",
      },
      references: {
        all_missing: "غير قادر على العثور على بيانات المراجع.",
        many_missing: "واحد على الأقل من المراجع المرتبطة لم تعد متوفرة.",
        single_missing: "المرجع المرتبط لم يعد يبدو متاحًا.",
      },
      password: {
        toggle_visible: "اخفاء الرقم السري",
        toggle_hidden: "اظهار الرقم السري",
      },
    },
    message: {
      about: "حول",
      are_you_sure: "هل أنت واثق؟",
      bulk_delete_content:
        "هل أنت متأكد أنك تريد حذف هذا %{name}? |||| هل أنت متأكد من أنك تريد حذف هذه العناصر%{smart_count}?",
      bulk_delete_title: "حذف %{name} |||| احذف عناصر%{smart_count}%{name}",
      delete_content: "هل أنت متأكد أنك تريد حذف هذا البند؟",
      delete_title: "حذف %{name} #%{id}",
      details: "تفاصيل",
      error: "حدث خطأ في التطبيق ولم يمكن إكمال طلبك.",
      invalid_form: "النموذج غير صالح. يرجى التحقق من وجود أخطاء",
      loading: "يتم تحميل الصفحة، فقط لحظة من فضلك",
      no: "لا",
      not_found: "الصفحة غير موجودة",
      yes: "نعم ",
      unsaved_changes:
        "لم يتم حفظ بعض تغييراتك. هل أنت متأكد أنك تريد تجاهلها؟",
    },
    navigation: {
      no_results: "لا توجد نتائج",
      no_more_results: "رقم الصفحة%{page} خارج الحدود. جرب الصفحة السابقة.",
      page_out_of_boundaries: "رقم الصفحة%{page} خارج الحدود",
      page_out_from_end: "لا يمكن الذهاب بعد الصفحة الأخيرة",
      page_out_from_begin: "لا يمكن الذهاب قبل الصفحة الأولى",
      page_range_info: "%{offsetBegin}-%{offsetEnd} من %{total}",
      page_rows_per_page: "الصفوف لكل صفحة:",
      next: "التالى",
      prev: "السابق",
      skip_nav: "تخطي الى المحتوي",
    },
    sort: {
      sort_by: "رتب حسب %{field} %{order}",
      ASC: "تصاعدي",
      DESC: "تنازلي",
    },
    auth: {
      auth_check_error: "الرجاء تسجيل الدخول للاستمرار",
      user_menu: "الملف الشخصي",
      username: "اسم المستخدم",
      password: "كلمة السر",
      sign_in: "تسجيل الدخول",
      sign_in_error: "أخفقت المصادقة، يرجى إعادة المحاولة",
      logout: "تسجيل الخروج",
    },
    notification: {
      updated: "تم تحديث العنصر |||| تم تحديث%{smart_count} من العناصر",
      created: "تم إنشاء العنصر",
      deleted: "تم حذف العنصر |||| تم حذف%{smart_count} من العناصر",
      bad_item: "عنصر غير صحيح",
      item_doesnt_exist: "العنصر غير موجود",
      http_error: "خطأ في اتصال الخادم",
      i18n_error: "لا يمكن تحميل الترجمة لهذه اللغة",
      data_provider_error:
        "خطأ في مزود البيانات. تحقق من وحدة التحكم للحصول على التفاصيل.",
      canceled: "تم إلغاء الإجراء",
      logged_out: "انتهت جلستك، يرجى إعادة الاتصال.",
    },
    validation: {
      required: "مطلوب",
      minLength: "يجب أن يكون%{min} حرفًا على الأقل",
      maxLength: "يجب أن يكون%{max} حرفًا أو أقل",
      minValue: "يجب أن يكون%{min} على الأقل",
      maxValue: "يجب أن يكون%{max} أو أقل",
      number: "يجب أن يكون رقما",
      email: "يجب أن يكون بريدًا إلكترونيًا صالحًا",
      oneOf: "يجب أن يكون واحدًا من:%{options}",
      regex: "يجب أن يتطابق مع تنسيق محدد (regex):%{pattern}",
    },
  },

  no: "لا يوجد",
  records: "بيانات",
};

export default arabicMessages;
