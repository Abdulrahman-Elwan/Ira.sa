
(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



let translations = {
  en: {
    en: 'انجليزي',
    ar: 'عربي',
    Home: 'Home',
    about: 'About',
    Services: 'Services',
    contact: 'Contact',
    full_name: 'INDUSTRIAL RESOURCES ARABIA CO. LTD',
    hero_text1: 'Your trusted partner across diverse industries',
    hero_text2: 'We are a leading provider of comprehensive industrial services, dedicated to supporting businesses across a wide range of sectors. With a strong commitment to quality, innovation, and safety, we deliver tailored solutions that help our clients optimize operations, enhance efficiency, and achieve sustainable growth.',
    hero_text3: 'Our services span multiple industries, including manufacturing, energy, construction, oil and gas, and logistics. From maintenance and repair to specialized engineering solutions, we bring expertise and cutting-edge technology to every project.',
    hero_bott: 'Get Started',
    coreOfferings: 'Core Offerings',
    coreOfferingsTitle1: 'Maintenance and Repairs',
    coreOfferingsTitle2: 'Engineering and Consulting',
    coreOfferingsTitle3: 'Supply Chain Support',
    coreOfferingsTitle4: 'Material Supply',
    coreOfferingsTitle5: 'Janitorial Services',
    coreOfferingsTitle6: 'Trading- Office Supplies',
    coreOfferingsp1: 'Ensuring the longevity and efficiency of industrial equipment and facilities.',
    coreOfferingsp2: 'Providing expert advice and solutions to tackle complex challenges.',
    coreOfferingsp3: 'Streamlining procurement and logistics for operational excellence.',
    coreOfferingsp4: 'Importing and Delivering the Original and OEM Manufactured spare parts and materials required for the Petrochemical Industries at the shortest time span.',
    coreOfferingsp5: 'Doing complete janitorial and cleaning services for the Offices, warehouses wioth world-class equipment and tools. ',
    coreOfferingsp6: 'We are authorized supplier of replacement cartridges of many globally well-known brands. We provide all major printer toner cartridges. We can supply computer stationeries and office stationeries as well.',
    about_us: 'About Us',
    hero_about_text: 'Trusted Partner in Industrial Solutions and Trading Excellence',
    read: 'Read more -->',
    aboutText1: 'Industrial Resources Arabia(IRA) was formed with the express intention to serving the need of Gas & Oil Field Industry, Power Generation and Distribution by providing the Engineering solution in Mechanical, Electrical, Safety, Construction and Instrumentation areas through qualified professionals. IRA is an Industrial support Service firm specialized in petrochemical [projects, turnaround activities, periodinc and annual maintenance in addition to trading of Industrial Materials and Spare Parts, Office Stationeries and Cleaning materials and Chermicals.',
    aboutText2: 'This division serves as an end-to-end solutions provider in the technology sector across Saudi Arabia. It supplies high-quality replacement cartridges for globally renowned brands like HP, Ricoh, Canon, Brother, Toshiba, Epson, and Konica. In addition, the division provides computer peripherals, office supplies, and stationery, ensuring reliable and environmentally friendly solutions for businesses.',
    aboutText3: 'This division is managed by a team of highly qualified professionals with extensive expertise in the Middle East market. Its primary objective is to act as a commercial bridge between manufacturers and buyers. The division specializes in sourcing, identifying, and supplying high-quality materials such as industrial supplies, construction materials, electrical components, instrumentation materials, safety equipment, fasteners, and industrial tools to meet diverse market demands.',
    aboutText4: 'was formed with the express intentionto serving the needs of Gas & Oil Field industry, Power Generation and Distribution by providing the Engineering solution in Mechanical, Electrical, Safety, Construction, and instrumentation areas, through qualified professionals. IRA is an Industrial Support Services firm specializing in petrochemical projects, turnaround activities, periodic and annual maintenance in addition to short-term and long-term staffing, recruiting, and consulting.',
    aboutTit1: 'Cartridges and Computer Peripherals Division :',
    aboutTit2: 'Industrial Materials Division :',
    aboutTit3: 'CONTRACTING DIVISION :',
    visionMission: 'Vision & Mission',
    vision: 'VISION :',
    visionText: 'To be integral part of the development of the Industry and Country, fully satisfying our clients as well as employees needs.',
    mission: 'MISSION :',
    missionText: 'Our Mission is to provide high quality Selectromechanical, Civil Construction and Inspection Services and Materials for Petrochemical, Oil Gas Industries in Saudi Arabia.',
    safety: 'SAFETY & QUALITY POLICY :',
    safetyText: 'IRA will maintain a rigourous loss prevention program aiming to prevent human distress and financial loss. Our safety program does not introduce any standard lower than the International Standard program but allows for adaption to meet local requirements and conditions.',
    Clients: 'Clients',
    ourServices: 'Our Services',
    ourServicespp: 'Your dependable partner for industrial needs, ensuring quality and service you can trust.',
    servicesTit1: 'Safety Items',
    servicesTit2: 'General Tools & Accessories',
    servicesTit3: 'Civil & Construction Materials',
    servicesTit4: 'Electrical & Mechanical',
    servicesTit5: 'Instrumentations',
    servicesTit6: 'Piping Materials',
    servicespp1: 'At IRA, we prioritize your safety by offering top-quality, certified safety items tailored to meet the highest standards.',
    servicespp2: 'Equip your team with precision-crafted tools that ensure reliability and performance in every task.',
    servicespp3: 'Building the future with premium construction materials tailored for durability and strength.',
    servicespp4: 'Innovative electrical and mechanical solutions designed to power your projects efficiently.',
    servicespp5: 'Achieve accuracy and control with cutting-edge instrumentation tailored to your industry needs.',
    servicespp6: 'Reliable piping materials engineered to meet the demands of industrial and commercial applications.',
    footerTag1: 'INDUSTRIAL RESOURCES ARABIA ',
    footerTag2: 'Useful Links',
    footerTag3: 'Our Services',
    footerTag4: 'Contact Us',
    footerText: 'One stop solution for your Industrial services and maintenance including material supply in addition to office stationeries and cleaning materials.',
    usefulLinks1: 'Home',
    usefulLinks2: 'About us',
    usefulLinks3: 'Services',
    usefulLinks4: 'Terms of service',
    usefulLinks5: 'Privacy policy',
    ourServicesFooter1: 'Contracting-Electromechanical',
    ourServicesFooter2: 'Trading-Industrial Materials & Spares',
    ourServicesFooter3: 'Trading-Office Supplies',
    ourServicesFooter4: 'Trading-Cleaning Materials',
    ourServicesFooter5: 'Logistics',
    ourServicesFooter6: 'Equipment Rental',
    contactFooter1: 'Dhahran Jubail Expy',
    contactFooter2: 'Saudi Arabia',
    contactFooter3: 'Phone: ',
    contactFooter4: 'Email: ',
    serviceDeta : 'Service Details',
    serviceDetaPP : 'we provide innovative workforce solutions to companies of all sizes to meet the challenges of today’s changing business environment.' ,
    serviceDetaPPB: 'Unusual challenges are our specialty',
    circle_service1 : 'Hydrojetting',
    circle_service2 : 'Manpower',
    circle_service3 : 'Janitorial',
    circle_service4 : 'Logistics',
    circle_service5 : 'Oil & Gas',
    circle_service6 : 'Electrical',
    circle_service7 : 'Instrumentation',
    circle_service8 : 'Mechanical',
    circle_service9 : 'Civil',
    circle_service10 : 'Stationary',
    circle_service11 : 'Rental',
    serviceDetaPP_1 : 'With our vast experiences of more than 18 years, we provide innovative workforce solutions to companies of all sizes to meet the challenges of today’s changing business environment. Unusual challenges are our specialty.',
    serviceDetaPP_2 : 'We are confident that we can find the ideal people for your unique situation. Since the company was formed, we exerted efforts to deploy all kinds of technical professionals and management personnel as it requires, and keep the workforce up-to date in terms of professional training and business acumen.',
    Divisions : 'Our Divisions',
    Divisions_p :'IRA was formed with the express intention to serving the needs of Gas & Oil Field industry, Power Generation and Distribution by providing the Engineering solution in Mechanical, Electrical, Safety, Construction, and instrumentation areas, through qualified professionals. IRA is an Industrial Support Services firm specializing in Petrochemical projects, Turnaround activities, periodic and annual maintenance in addition to short-term and long-term staffing, recruiting, and consulting',
    Divisions_h1:'CONTRACTING-ELECTROMECHANICAL',
    Divisions_h2:'TRADING-INDUSTRIAL MATERIALS & SPARES',
    Divisions_h3:'TRADING-OFFICE SUPPLIES',
    Divisions_h4:'TRADING-CLEANING MATERIALS',
    Divisions_h5:'LOGISTICS',
    Divisions_h6:'EQUIPMENT RENTAL',
    Divisions_p1:'We provide innovative workforce solutions to companies of all sizes to meet the challenges of today\'s changing business environment. Unusual challenges are our speciality.',
    Divisions_p2:'Managed by a group of highly qualified professionals with substantial knowledge of the Middle East. Our aim is to create a commercial interface between the manufacturer and the buyer. IRA focuses on identifying, sourcing, and supplying the right kind of industrial construction, electrical, instrumentation materials, safety items, fasteners, and industrial tools and related items.',
    Divisions_p3:'We are an authorized supplier of replacement cartridges for many globally well-known brands. We provide all major printer toner cartridges. We can supply computer stationeries and office stationeries as well.',
    Divisions_p4:'We have been in the field of cleaning materials and cleaning equipment trade since 2002, with a stock of more than 12,000 individual items covering cleaning equipment and chemicals, paper tissue products, and many more.',
    Divisions_p5:'IRA offers shipping and logistics solutions in addition to providing modern technologies starting from tracking shipments once they are received from the supplier until they are delivered to the customers.',
    Divisions_p6:'We have a division of construction equipment rental services of equipment like cranes, forklifts, bulldozers, earth movers, payloaders, and industrial equipment like welding machines, air compressors, generators, etc.',
    Query : 'Contact For Any Query',
    Email : 'E-mail',
    E_mail : 'Email',
    Phonee : 'Phone',
    address :'Address',
    addressSp : 'Dhahran Jubail Expy',
    firstName : 'First Name',
    firstNameErr : 'Please enter a valid first name',
    LastName : 'Last Name',
    LastNameErr : 'Please enter a valid Last name',
    emailError :'Please enter a valid email',
    phoneNumber :'Phone Number',
    phoneNumberError : 'Please enter a valid phone number',
    subject : 'Subject',
    subjectError :' Please enter a subject',
    message: 'Message',
    messageError: 'Please enter a message',
    SendMessage : 'Send Message',
    what : 'What We Do',
    whatpp :'At IRA, we deliver tailored solutions across industries, offering top-quality safety items, tools, construction materials, and advanced systems to meet your unique needs—ensuring reliability and excellence in every service we provide. ',
    safetyItem1 : 'Safety shoes',    
    safetyItem2 : 'Safety helmets',
    safetyItem3 : 'Safety Glasses',
    safetyItem4 : 'Goggles',
    safetyItem5 : 'Working gloves',
    safetyItem6 : 'Rubber boots',
    safetyItem7 : 'Ear defenders',
    safetyItem8 : 'Safety clothes',
    safetyItem9 : 'Coverall',
    safetyItem10 : 'Safety Belts', 
    safetyItem11 : 'Ear plugs', 
    safetyItem12 : 'Face shields', 
    safetyItem13 : 'Welding goggles', 
    safetyItem14 : 'Dust mask', 
    safetyItem15 : 'Cotton gloves', 
    safetyItem16 : 'Harness and Lanyards', 
    safetyItem17 : 'Smoke detectors', 
    safetyItem18 : 'Welding glasses', 
    accessoriesItem1 : 'Tool Boxes',    
    accessoriesItem2 : 'Sockets',
    accessoriesItem3 : 'Screw Drivers',
    accessoriesItem4 : 'Wrenches and Spanners',
    accessoriesItem5 : 'Pliers',
    accessoriesItem6 : 'Hammers',
    accessoriesItem7 : 'Hex Keys',
    accessoriesItem8 : 'Chisels and Punches',
    civilItem1 :'Western / Eastern Water Closets, Water proofing materials, Gypsum boards, Asphalt concrete base course',
    civilItem2 :'Galvanized Materials, Wood, Steel Ladders, Plaster bead & Lath, Gypsum board moisture Resistant',
    civilItem3 :'Lavatory water Mounted, Paint, Sand Asphalt',
    civilItem4 :'Hallow Metal Doors, Aluminum Doors',
    civilItem5 :'Aluminum Windows',
    lectricalItem1 : 'Contactors, Switches, Breakers, Relays, Time delay relays.',
    lectricalItem2 : 'Transformers, voltage regulators, Distribution boards.',
    lectricalItem3 : 'Insulators, Lightning arrestors, Power cable, sockets, Fuses.',
    lectricalItem4 : 'Rigid and Gl conducts, PVC conduits, Flexible conduits.',
    lectricalItem5 : 'Cable legs, Extension cords, Extension drums, Ballasts.',
    lectricalItem6 : 'Halogen lamps, Sodium lamps, Fluorescent Fixtures.',
    lectricalItem7 : 'Projection Lamp, Mercury Vapor lamps, Miniature lamps.',
    lectricalItem8 : 'Dimmers, Industrial warehouse bay fixtures, Explosion Proof fixtures.',
    lectricalItem9 : 'Emergency lightings, DC lamps, Measuring instruments.',
    lectricalItem10 : 'and Insulation testers, Photocell sensors, Insulation tapes.',
    lectricalItem11 : 'Wiring accessories, AC-DC Motors, Industrial fans, Control circuits.',
    lectricalItem12 : 'Solenoid valves, Actuators, Control circuits, Limit switches, Micro switches',
    lectricalItem13 : 'Overload relays etc',
    fluid : 'FLUID TECHNOLOGY PRODUCTS: ',
    fluidItem1 : 'Phase behavior system',
    fluidItem2 : 'High pressure viscometer like bench to model and Rolling ball viscometer',
    fluidItem3 : 'High pressure Cylinder',
    fluidItem4 : 'Gasometer/Gas Tester',
    fluidItem5 : 'Digital positive Displacement pumps',
    fluidItem6 : 'Enhance oil recovery systems',
    fluidItem7 : 'Pressure calibration like piston gauges, digital pressure cells, pressure range 1 k/psi to 20 k/psi',
    analyzers : 'ANALYZERS: ',
    analyzersItem1 : 'Oxygen Analyzers',
    analyzersItem2 : 'Thermal Conductivity Analyzers',
    analyzersItem3 : 'Acoustic Cement Analyzers',
    analyzersItem4 : 'Corrosion and acid Analyzers',
    analyzersItem5 : 'Toxic and Flammable gas Analyzers',
    analyzersItem6 : 'Moisture Measurement Analyzers',
    analyzersItem7 : 'Portable Natural Gas Heating Analyzers',
    transmitters : 'TRANSMITTERS: ',
    transmittersItem1 : 'Flow transmitters',
    transmittersItem2 : 'Level transmitters',
    transmittersItem3 : 'Pressure transmitters',
    Pipes : 'Piping Materials',
    PipesItem1 : 'Carbon Steel Pipes',
    PipesItem2 : 'Barrier Insulation',
    PipesItem3 : 'Metal Expansion Joint',
    PipesItem4 : 'Gaskets',
    PipesItem5 : 'Elbow Stainless Steel',
    PipesItem6 : 'Elbow Steel',
    PipesItem7 : 'Hose Connector',
    PipesItem8 : 'Tee for tube coupling',
    PipesItem9 : 'Sampling Valve',
  },
  ar: {
    en: 'English',
    ar: 'عربي',
    Home: 'الرئيسية',
    about: 'عن الشركة',
    Services: 'الخدمات',
    contact: 'اتصل بنا',
    full_name: 'شركة الموارد الصناعية العربية المتحدة',
    hero_text1: 'شريكك الموثوق في مختلف الصناعات',
    hero_text2: 'نحن مزود رائد للخدمات الصناعية الشاملة، نسعى لدعم الأعمال عبر مجموعة واسعة من القطاعات. مع الالتزام بالجودة والابتكار والسلامة، نقدم حلولاً مخصصة تساعد عملاءنا على تحسين العمليات وتعزيز الكفاءة وتحقيق النمو المستدام.',
    hero_text3: 'تشمل خدماتنا عدة صناعات، بما في ذلك التصنيع والطاقة والبناء والنفط والغاز والخدمات اللوجستية. من الصيانة والإصلاح إلى الحلول الهندسية المتخصصة، نوفر الخبرة والتكنولوجيا المتطورة لكل مشروع.',
    hero_bott: 'ابدأ الآن',
    coreOfferings: 'مجالاتنا الأساسية',
    coreOfferingsTitle1: 'الصيانة والإصلاحات',
    coreOfferingsTitle2: 'الهندسة والاستشارات',
    coreOfferingsTitle3: 'دعم سلسلة التوريد',
    coreOfferingsTitle4: 'توريد المواد',
    coreOfferingsTitle5: 'خدمات التنظيف',
    coreOfferingsTitle6: 'تجارة - اللوازم المكتبية',
    coreOfferingsp1: '. ضمان كفاءة واستمرارية المعدات والمرافق الصناعية',
    coreOfferingsp2: '. تقديم استشارات وحلول خبراء للتعامل مع التحديات المعقدة',
    coreOfferingsp3: '. تبسيط المشتريات والخدمات اللوجستية لتحقيق التميز التشغيلي',
    coreOfferingsp4: '. استيراد وتسليم قطع الغيار والمواد المصنعة الأصلية المطلوبة للصناعات البتروكيماوية في أقصر فترة زمنية',
    coreOfferingsp5: '. تقديم خدمات تنظيف شاملة للمكاتب والمستودعات باستخدام معدات وأدوات عالمية المستوى',
    coreOfferingsp6: '. نحن مورد معتمد لخراطيش الطابعات البديلة للعديد من العلامات التجارية العالمية. نوفر جميع أنواع خراطيش الحبر للطابعات الرئيسية، بالإضافة إلى الأدوات المكتبية ولوازم الحاسب',
    about_us: 'من نحن',
    hero_about_text: 'شريك موثوق في حلول الصناعة والتميز التجاري',
    read: 'اقرأ المزيد',
    aboutText1: 'تأسست شركة الموارد الصناعية العربية بهدف تلبية احتياجات صناعة النفط والغاز وتوليد وتوزيع الطاقة من خلال تقديم حلول هندسية في مجالات الميكانيكا والكهرباء والسلامة والبناء والأجهزة عبر محترفين مؤهلين. نحن شركة خدمات دعم صناعية متخصصة في المشاريع البتروكيماوية والأنشطة الدورية والصيانة السنوية بالإضافة إلى تجارة المواد الصناعية وقطع الغيار والمستلزمات المكتبية ومواد التنظيف والمواد الكيميائية.',
    aboutText2: 'تعمل هذه الوحدة كموفر حلول شاملة في قطاع التكنولوجيا في جميع أنحاء المملكة العربية السعودية. وتوفر خراطيش بديلة عالية الجودة للعلامات التجارية العالمية المعروفة  بالإضافة إلى ذلك، تقدم الوحدة ملحقات الكمبيوتر، اللوازم المكتبية، والقرطاسية، مما يضمن حلولاً موثوقة وصديقة للبيئة للشركات',
    aboutText3: '. يُدار هذا القسم من قبل فريق من المحترفين المؤهلين تأهيلاً عاليًا وذوي خبرة واسعة في سوق الشرق الأوسط. يهدف القسم إلى أن يكون جسرًا تجاريًا بين الشركات المصنعة والمشترين. يتخصص في تحديد وتوريد مواد عالية الجودة مثل اللوازم الصناعية، مواد البناء، المكونات الكهربائية، مواد الأجهزة، معدات السلامة، أدوات الربط، والأدوات الصناعية لتلبية احتياجات السوق المتنوعة',
    aboutText4: 'تأسست الشركة لتلبية احتياجات صناعة النفط والغاز، وتوليد وتوزيع الطاقة، من خلال تقديم الحلول الهندسية في مجالات الميكانيكا، الكهرباء، السلامة، البناء، والأجهزة عبر محترفين مؤهلين. نحن شركة خدمات دعم صناعية متخصصة في المشاريع البتروكيماوية، الأنشطة الدورية، الصيانة السنوية، بالإضافة إلى التوظيف والاستشارات على المدى القصير والطويل',
    aboutTit1: ': قسم الخراطيش وملحقات الحاسوب',
    aboutTit2: ': قسم المواد الصناعية',
    aboutTit3: ': قسم المقاولات',
    visionMission: 'الرؤية والرسالة',
    vision: ': الرؤية',
    visionText: '. أن نكون جزءًا لا يتجزأ من تطوير الصناعة والبلد مع تحقيق رضا العملاء والموظفين',
    mission: ': الرسالة',
    missionText: '. مهمتنا هي تقديم خدمات ومواد عالية الجودة للصناعات البتروكيماوية والنفط والغاز في المملكة العربية السعودية',
    safety: ': سياسة السلامة والجودة',
    safetyText: 'سنحافظ على برنامج صارم لمنع الخسائر بهدف منع الضيق البشري والخسائر المالية. لا يُدخل برنامج السلامة الخاص بنا أي معايير أقل من المعايير الدولية ولكنه يسمح بالتكيف لتلبية المتطلبات والظروف المحلية.',
    Clients: 'العملاء',
    ourServices: 'خدماتنا',
    ourServicespp: 'شريكك الذي يمكن الاعتماد عليه لتلبية الاحتياجات الصناعية، مما يضمن الجودة والخدمة التي يمكنك الوثوق بها.',
    servicesTit1: 'مواد السلامة',
    servicesTit2: 'الأدوات والإكسسوارات العامة',
    servicesTit3: 'مواد البناء',
    servicesTit4: 'الكهرباء والميكانيكا',
    servicesTit5: 'الأجهزة',
    servicesTit6: 'مواد الأنابيب',
    servicespp1: 'نضع السلامة في الأولوية من خلال تقديم مواد معتمدة وذات جودة عالية تلبي أعلى المعايير',
    servicespp2: 'تجهيز فريقك بأدوات دقيقة تضمن الأداء والموثوقية في كل مهمة',
    servicespp3: 'بناء المستقبل باستخدام مواد بناء متينة ومصممة لتحمل الظروف الصعبة',
    servicespp4: 'حلول كهربائية وميكانيكية مبتكرة مصممة لدعم مشاريعك بكفاءة',
    servicespp5: 'تحقيق الدقة والتحكم باستخدام أجهزة حديثة تلبي احتياجات صناعتك',
    servicespp6: 'مواد أنابيب موثوقة مصممة لتلبية متطلبات التطبيقات الصناعية والتجارية',
    footerTag1: 'الموارد الصناعية العربية',
    footerTag2: 'روابط',
    footerTag3: 'خدماتنا',
    footerTag4: 'اتصل بنا',
    footerText: 'حل شامل لخدماتك الصناعية والصيانة بما في ذلك توريد المواد بالإضافة إلى اللوازم المكتبية ومواد التنظيف.',
    usefulLinks1: 'الرئيسية',
    usefulLinks2: 'من نحن',
    usefulLinks3: 'الخدمات',
    usefulLinks4: 'شروط الخدمة',
    usefulLinks5: 'سياسة الخصوصية',
    ourServicesFooter1: 'مقاولات- الإلكتروميكانيكية',
    ourServicesFooter2: 'تجارة- المواد الصناعية وقطع الغيار',
    ourServicesFooter3: 'تجارة- اللوازم المكتبية',
    ourServicesFooter4: 'تجارة- مواد التنظيف',
    ourServicesFooter5: 'الخدمات اللوجستية',
    ourServicesFooter6: 'تأجير المعدات',
    contactFooter1: 'طريق الظهران الجبيل السريع',
    contactFooter2: 'المملكة العربية السعودية',
    contactFooter3: 'الهاتف:',
    contactFooter4: 'البريد الإلكتروني:',
    serviceDeta: 'تفاصيل الخدمة',
  serviceDetaPP: 'نقدم حلولاً مبتكرة للقوى العاملة للشركات من جميع الأحجام لمواجهة تحديات بيئة الأعمال المتغيرة ',
  serviceDetaPPB: 'التحديات غير المعتادة هي تخصصنا',
  circle_service1: 'التنظيف بالماء المضغوط',
  circle_service2: 'القوى العاملة',
  circle_service3: 'الخدمات التنظيفية',
  circle_service4: 'الخدمات اللوجستية',
  circle_service5: 'النفط والغاز',
  circle_service6: 'الكهرباء',
  circle_service7: 'الأجهزة الدقيقة',
  circle_service8: 'الميكانيكا',
  circle_service9: 'الهندسة المدنية',
  circle_service10: 'المستلزمات المكتبية',
  circle_service11: 'التأجير',
  serviceDetaPP_1: 'بفضل خبرتنا الواسعة التي تزيد عن 18 عامًا، نقدم حلولًا مبتكرة للقوى العاملة للشركات من جميع الأحجام لمواجهة تحديات بيئة الأعمال المتغيرة اليوم. التحديات غير المعتادة هي تخصصنا.',
  serviceDetaPP_2: 'نحن على ثقة من قدرتنا على إيجاد الأشخاص المثاليين لموقفك الفريد. منذ تأسيس الشركة، بذلنا جهودًا لنشر جميع أنواع المتخصصين الفنيين وموظفي الإدارة حسب الحاجة، والحفاظ على تحديث القوى العاملة من حيث التدريب المهني والذكاء التجاري.',
  Divisions: 'الأقسام لدينا',
  Divisions_p: 'تأسست الشركة لتلبية احتياجات صناعة حقول الغاز والنفط، وتوليد وتوزيع الطاقة، من خلال تقديم الحلول الهندسية في مجالات الميكانيكا والكهرباء والسلامة والبناء والأجهزة الدقيقة بواسطة محترفين مؤهلين. نحن شركة خدمات دعم صناعية متخصصة في مشاريع البتروكيماويات، وأنشطة الصيانة الدورية والسنوية، بالإضافة إلى التوظيف والاستشارات على المدى القصير والطويل.',
  Divisions_h1: 'التعاقدات - الكهروميكانيكية',
  Divisions_h2: 'التجارة - المواد الصناعية وقطع الغيار',
  Divisions_h3: 'التجارة - المستلزمات المكتبية',
  Divisions_h4: 'التجارة - مواد التنظيف',
  Divisions_h5: 'الخدمات اللوجستية',
  Divisions_h6: 'تأجير المعدات',
  Divisions_p1: 'نقدم حلولًا مبتكرة للقوى العاملة للشركات من جميع الأحجام لمواجهة تحديات بيئة الأعمال المتغيرة اليوم. التحديات غير المعتادة هي تخصصنا.',
  Divisions_p2: 'تدار الشركة بواسطة مجموعة من المحترفين ذوي المؤهلات العالية مع معرفة واسعة بمنطقة الشرق الأوسط. هدفنا هو إنشاء واجهة تجارية بين المصنع والمشتري. نركز على تحديد، وتأمين، وتوريد المواد الصناعية المناسبة، مثل مواد البناء، الكهربائية، وأجهزة القياس، والمواد المتعلقة بالأمان.',
  Divisions_p3: 'نحن موردون معتمدون لخراطيش الطباعة البديلة للعديد من العلامات التجارية العالمية. نقدم جميع أنواع خراطيش الحبر للطابعات الرئيسية، ويمكننا أيضًا توفير مستلزمات الكمبيوتر والمستلزمات المكتبية',
  Divisions_p4: 'نحن في مجال تجارة مواد ومعدات التنظيف منذ عام 2002، مع مخزون يتجاوز 12,000 عنصر فردي يغطي معدات التنظيف والمواد الكيميائية، ومنتجات الأنسجة الورقية وغيرها.',
  Divisions_p5: 'نقدم حلول الشحن والخدمات اللوجستية بالإضافة إلى تقديم تقنيات حديثة تبدأ من تتبع الشحنات بمجرد استلامها من المورد وحتى تسليمها للعملاء',
  Divisions_p6: 'لدينا قسم لتأجير معدات البناء مثل الرافعات، والرافعات الشوكية، والجرافات، ومعدات الحفر، بالإضافة إلى المعدات الصناعية مثل آلات اللحام، وضواغط الهواء، والمولدات، وما إلى ذلك.',
  Query: 'اتصل لأي استفسار',
  Email: 'البريد الإلكتروني',
  E_mail: 'البريد الإلكتروني',
  Phonee: 'الهاتف',
  address: 'العنوان',
  addressSp: 'طريق الظهران الجبيل السريع',
  firstName: 'الاسم الأول',
  firstNameErr: 'يرجى إدخال اسم أول صحيح',
  LastName: 'الاسم الأخير',
  LastNameErr: 'يرجى إدخال اسم أخير صحيح',
  emailError: 'يرجى إدخال بريد إلكتروني صحيح',
  phoneNumber: 'رقم الهاتف',
  phoneNumberError: 'يرجى إدخال رقم هاتف صحيح',
  subject: 'الموضوع',
  subjectError: 'يرجى إدخال موضوع',
  message: 'الرسالة',
  messageError: 'يرجى إدخال رسالة',
  SendMessage: 'إرسال الرسالة',
  what: 'ماذا نفعل ؟',
  whatpp: 'نقدم حلولاً مخصصة عبر الصناعات، مع توفير عناصر أمان عالية الجودة، وأدوات، ومواد بناء، وأنظمة متقدمة لتلبية احتياجاتك الفريدة - مما يضمن الموثوقية والتميز في كل خدمة نقدمها',
  safetyItem1: 'أحذية الأمان',
  safetyItem2: 'خوذات الأمان',
  safetyItem3: 'نظارات الأمان',
  safetyItem4: 'النظارات الواقية',
  safetyItem5: 'قفازات العمل',
  safetyItem6: 'الأحذية المطاطية',
  safetyItem7: 'أغطية الأذن',
  safetyItem8: 'ملابس الأمان',
  safetyItem9: 'البدلة المخصصة',
  safetyItem10: 'أحزمة الأمان',
  safetyItem11: 'سدادات الأذن',
  safetyItem12: 'واقيات الوجه',
  safetyItem13: 'نظارات اللحام',
  safetyItem14: 'قناع الغبار',
  safetyItem15: 'قفازات القطن',
  safetyItem16: 'الأحزمة والحبال',
  safetyItem17: 'كاشفات الدخان',
  safetyItem18: 'نظارات اللحام',
  accessoriesItem1: 'صناديق الأدوات',
  accessoriesItem2: 'المقابس',
  accessoriesItem3: 'مفكات البراغي',
  accessoriesItem4: 'المفاتيح',
  accessoriesItem5: 'الكماشة',
  accessoriesItem6: 'المطارق',
  accessoriesItem7: 'مفاتيح سداسية',
  accessoriesItem8: 'الإزميل والمثاقب',
  civilItem1: "مراحيض غربية/شرقية، مواد العزل المائي، ألواح الجبس، قاعدة أسفلتية خرسانية",
  civilItem2: "مواد مجلفنة، خشب، سلالم فولاذية، خرزة الجص وشبكة الجص، ألواح جبس مقاومة للرطوبة",
  civilItem3: "حنفيات مثبتة على الحائط، دهانات، رمل وأسفلت",
  civilItem4: "أبواب معدنية مجوفة، أبواب ألمنيوم",
  civilItem5: "نوافذ ألمنيوم",
  lectricalItem1: 'القواطع، والمفاتيح، والمرحلات، والمرحلات الزمنية.',
  lectricalItem2: 'المحولات، منظمات الجهد، لوحات التوزيع.',
  lectricalItem3: 'العوازل، مانعات الصواعق، الكابلات الكهربائية، والمقابس، والصمامات.',
  lectricalItem4: 'أنابيب التوصيل الصلبة والمرنة.',
  lectricalItem5: 'أرجل الكابلات، الوصلات الإضافية، البراميل الإضافية، الكوابح.',
  lectricalItem6: 'مصابيح الهالوجين، مصابيح الصوديوم، تجهيزات الفلورسنت.',
  lectricalItem7: 'مصابيح العرض، مصابيح بخار الزئبق، المصابيح المصغرة.',
  lectricalItem8: 'مخففات الإضاءة، تجهيزات المستودعات الصناعية، تجهيزات مقاومة للانفجار.',
  lectricalItem9: 'إضاءات الطوارئ، مصابيح التيار المباشر، أجهزة القياس.',
  lectricalItem10: 'وأجهزة اختبار العزل، مستشعرات الخلايا الضوئية، أشرطة العزل.',
  lectricalItem11: 'ملحقات الأسلاك، المحركات التيار المتردد/التيار المستمر، المراوح الصناعية، دوائر التحكم.',
  lectricalItem12: 'الصمامات الكهربائية، المحركات، دوائر التحكم، مفاتيح الحدود.',
  lectricalItem13: 'وغيرها.',
  fluid: 'منتجات تقنية السوائل:',
  fluidItem1: 'نظام سلوك الأطوار',
  fluidItem2: 'مقياس اللزوجة عالي الضغط',
  fluidItem3: 'أسطوانة الضغط العالي',
  fluidItem4: 'جهاز قياس الغاز',
  fluidItem5: 'مضخات الإزاحة الإيجابية الرقمية',
  fluidItem6: 'أنظمة تعزيز استخراج النفط',
  fluidItem7: 'معايرة الضغط (مثل مقاييس المكبس والخلايا الرقمية)',
  analyzers: 'المحللات:',
  analyzersItem1: ' الأكسجين',
  analyzersItem2: ' التوصيل الحراري',
  analyzersItem3: ' الأسمنت الصوتية',
  analyzersItem4: ' التآكل والحمض',
  analyzersItem5: ' الغازات السامة والقابلة للاشتعال',
  analyzersItem6: ' قياس الرطوبة',
  analyzersItem7: ' التدفئة للغاز الطبيعي المحمولة',
  transmitters: 'أجهزة الإرسال:',
  transmittersItem1: 'أجهزة إرسال التدفق',
  transmittersItem2: 'أجهزة إرسال المستوى',
  transmittersItem3: 'أجهزة إرسال الضغط',
  Pipes: 'مواد الأنابيب:',
  PipesItem1: 'أنابيب الصلب الكربوني',
  PipesItem2: 'العزل الحاجز',
  PipesItem3: 'الوصلة المعدنية القابلة للتوسع',
  PipesItem4: 'الحشوات',
  PipesItem5: 'كوع من الفولاذ المقاوم للصدأ',
  PipesItem6: 'كوع من الفولاذ',
  PipesItem7: 'موصل الخراطيم',
  PipesItem8: 'الموصلات الأنبوبية',
  PipesItem9: 'صمام أخذ العينات',
  }
};

let rtlLanguages = ['ar']; // قائمة اللغات التي تتطلب الاتجاه من اليمين إلى اليسار
document.getElementById('languageSelector').addEventListener('change', (e) => {
  let selectedLang = e.target.value;
  applyTranslations(selectedLang);
  applyFont(selectedLang);
  localStorage.setItem('selectedLanguage', selectedLang);
});

function applyTranslations(language) {
  document.querySelectorAll('[data-key]').forEach((element) => {
    let key = element.getAttribute('data-key');
    element.innerHTML = translations[language][key];
  });

  let elements = document.querySelectorAll(".rotat");
  let rotatNot = document.querySelectorAll(".rotatNot");
  let icon = document.querySelectorAll(".iconnn");
  let textRightElements = document.querySelectorAll(".text_right");
  let textCenterElements = document.querySelectorAll(".text_center");
  let services1 = document.querySelectorAll("#services1");
  let lists = document.querySelectorAll('.list');
  let paragraph = document.querySelectorAll('.paragraph');
  let paragraphli = document.querySelectorAll('.paragraphli');
  let paragraphlinav = document.querySelectorAll('.paragraphlinav');
  let pricing = document.querySelectorAll('.banner .container .text a');
  let footerText = document.querySelectorAll('.footerText');
  lists.forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.direction = 'rtl';
    }
  });

  Array.from(elements).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.direction = 'rtl';
    } else {
      element.style.direction = 'ltr';
    }
  });

  Array.from(rotatNot).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.direction = 'ltr';
    }
  });

  Array.from(icon).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.textAlign = 'right';
      element.style.justifyContent= 'right';
      element.style.display= 'flex';
      element.style.marginRight= '20px';
    } else {
      element.style.justifyContent= 'lift';
      element.style.display= 'block';
    }
  });

  Array.from(footerText).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.padding = '0';
    } else {
      element.style.paddingRight = '25px';
    }
  });

  Array.from(textRightElements).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.textAlign = 'right';
    } else {
      element.style.textAlign = 'left';
    }
  });


  Array.from(textCenterElements).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.textAlign = 'center';
    } else {
      element.style.textAlign = 'left';
    }
  });

  Array.from(services1).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.letterSpacing = '0';
    } else {
      // لإزالة تأثير letterSpacing إذا كان موجوداً
      element.style.letterSpacing = '5px';
    }
  });


  Array.from(paragraph).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.letterSpacing = '0';
      element.style.fontWeight = '500';
    }else{
      element.style.fontWeight = 'normal';
    }
  });

  Array.from(paragraphlinav).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.letterSpacing = '0';
      element.style.fontWeight = '600';
    }else{
      element.style.fontWeight = 'normal';
    }
  });

  Array.from(paragraphli).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      element.style.letterSpacing = '0';
      element.style.fontWeight = '500';
      element.style.fontSize = '15px';
    }else{
      element.style.fontWeight = '500';
      element.style.fontSize = '12px';
    }
  });


  Array.from(pricing).forEach((element) => {
    if (rtlLanguages.includes(language)) {
      if (window.matchMedia('(min-width: 550px)').matches) {
        element.style.width = '270px';
        element.style.padding = '7px 15px'
      } if (window.matchMedia('(max-width: 550px)').matches) {
        element.style.width = '255px'; // قيمة عرض صحيحة
        element.style.padding = '5px 8px'
      }
    } else {
      if (window.matchMedia('(min-width: 550px)').matches) {
        element.style.width = '300px';
        element.style.padding = '7px 15px'
      } if (window.matchMedia('(max-width: 550px)').matches) {
        element.style.width = '100%'; // قيمة عرض صحيحة
        element.style.padding = '5px 8px'
      }
    }
  });
}

function applyFont(language) {
  let body = document.body;
  if (rtlLanguages.includes(language)) {
    body.style.fontFamily = '"Noto Kufi Arabic", sans-serif';
  } else {
    body.style.fontFamily = '"Roboto", sans-serif';
  }
}


document.addEventListener('DOMContentLoaded', function () {
  let savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  document.getElementById('languageSelector').value = savedLanguage;
  applyTranslations(savedLanguage);
  applyFont(savedLanguage);

  // كود جديد لتعيين قيمة الحقل "subject" بناءً على اللغة
  const subjectInput = document.getElementById('subject');
  const language = navigator.language.startsWith('ar') ? 'ar' : 'en';
  const value = subjectInput.getAttribute(`data-key-${language}`);
  subjectInput.value = value;
});








