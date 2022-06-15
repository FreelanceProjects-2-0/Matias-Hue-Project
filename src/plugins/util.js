import { DateTime } from 'luxon';
import _ from 'lodash';
const util = {
  LessonFirstText(description) {
    let split = description.split('\n');
    return split[0];
  },
  EducationPlanDescriptionToArray(description) {
    if (description != undefined) {
      let split = description.split('\n');
      return split;
    } else {
      return '';
    }
  },
  isOptionalText(value) {
    if (value) return 'Ja';
    else return 'Nej';
  },
  formatDate(input, withTime) {
    let dt;

    if (!input) {
      return null;
    }

    if (input instanceof DateTime) {
      dt = input;
    } else if (input instanceof Date) {
      dt = DateTime.fromJSDate(input);
    } else {
      dt = DateTime.fromJSDate(new Date(input));
    }

    return withTime ? dt.toFormat('dd-MM-yyyy HH:mm') : dt.toFormat('dd-MM-yyyy');
  },
  FormatDanishMonth() {
    return ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];
  },
  ToDanishMotnh(value) {
    return value.title.charAt(0).toUpperCase() + value.title.slice(1);
  },
  localizeCalendar() {
    return {
      'header-date-format': (date) => _.upperFirst(DateTime.fromISO(date).setLocale('da-DK').toFormat('MMMM y')),
      'month-format': (date) => _.upperFirst(DateTime.fromISO(date).setLocale('da-DK').toFormat('MMMM')),
      'weekday-format': (date) => DateTime.fromISO(date).setLocale('da-DK').toFormat('ccccc'),
      'show-week': true,
      'show-adjacent-months': true,
      'locale-first-day-of-year': 4,
      'first-day-of-week': 1,
      'title-date-format': (date) => _.upperFirst(DateTime.fromISO(date).setLocale('da-DK').toFormat('d. MMMM y')),
    };
  },
  createStudentLesson(value) {
    const studentLesson = {
      state: 0,
      comment: value.comment,
      studentId: value.id,
      studentName: value.name,
    };
    return studentLesson;
  },
  LessonTypeFromIdToText(value) {
    if (value == 0) return this.LektionsType()[0].text;
    if (value == 1) return this.LektionsType()[1].text;
    if (value == 2) return this.LektionsType()[2].text;
  },
  LektionsType() {
    return [
      {
        id: 0,
        text: 'ikke sat',
      },
      {
        id: 1,
        text: 'Teoretisk',
      },
      {
        id: 2,
        text: 'Praktisk',
      },
    ];
  },
  StateFromNumberToText(value) {
    if (value == 0) return this.StateTypes()[0].text;
    if (value == 1) return this.StateTypes()[1].text;
    if (value == 2) return this.StateTypes()[2].text;
  },
  StateTypes() {
    return [
      {
        id: 0,
        text: 'Ikke evalueret',
      },
      {
        id: 1,
        text: 'Mislykkedes',
      },
      {
        id: 2,
        text: 'Bestået',
      },
    ];
  },
  CalenderLessonColor(type, isPublic) {
    if (type == 0) return 'black';
    else if (type == 1) {
      if (isPublic) return 'blue';
      else return '#64B5F6';
    } else if (type == 2) {
      if (isPublic) return 'orange';
      else return '#FFB74D';
    } else if (type == 3) {
      if (isPublic) return 'green';
      else return '#81C784';
    } else if (type == 4) return 'purple';
    else if (type == 5) return 'grey';
    else return 'black';
  },

  /**
   * ```
   * Returns an object with settings for v-data-table
   *
   * If itemsPerPage is empty, the function will return 5.
   *
   * The user what the user can choose between - 5, 10, 15, -1 (All)
   * ```
   * @param  {} itemsPerPage Int32
   * @returns {} Settings for v-data-tables
   */
  dataTableOptions(itemsPerPage) {
    return {
      'footer-props': {
        'items-per-page-text': 'Elementer per side',
        'items-per-page-options': [5, 10, 15, 25, -1],
      },
      'items-per-page': itemsPerPage ? itemsPerPage : 5,
    };
  },
  /**
   * ```
   * If returnTypeText is true = Return array of text
   * If returnTypeText is false = Return array of int32
   * ```
   * @param  {} value Int (Access Level)
   * @param  {} returnTypeText Bool
   */
  parseStaffAccessValue(value, returnTypeText) {
    let initValue = parseInt(value);
    const possiblePermissionValues = [
      { text: 'ReadUnassignedStudents', value: 1024 },
      { text: 'ModifySite', value: 512 },
      { text: 'ReadSite', value: 256 },
      { text: 'ModifyLessonPlan', value: 128 },
      { text: 'ReadLessonPlan', value: 64 },
      { text: 'ModifyStaff', value: 32 },
      { text: 'ReadStaff', value: 16 },
      { text: 'AssignSelfStudent', value: 8 },
      { text: 'ModifyStudents', value: 4 },
      { text: 'ReadStudents', value: 2 },
      { text: 'AddStudentComment', value: 1 },
    ];
    let staffPermissions = [];
    let modulo = 0;

    for (let i = 0; possiblePermissionValues.length > i; i++) {
      modulo = initValue % possiblePermissionValues[i].value;

      if (modulo != initValue) {
        returnTypeText ? staffPermissions.push(possiblePermissionValues[i].text) : staffPermissions.push(possiblePermissionValues[i].value);
        initValue -= initValue - modulo;
      }
    }
    return staffPermissions;
  },
};

export default util;
