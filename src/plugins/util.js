const util = {
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
  translateGroupClasses(text) {
    switch (text) {
      case text == 'Living room':
        return 'Living room';
      case text == 'Kitchen':
        return 'Køkken';
      case text == 'Dining':
        return 'Dining';
      case text == 'Bedroom':
        return 'Bedroom';
      case text == 'Kids bedroom':
        return 'Kids bedroom';
      case text == 'Bathroom':
        return 'Bathroom';
      case text == 'Nursery':
        return 'Nursery';

      case text == 'Recreation':
        return 'Recreation';
      case text == 'Office':
        return 'Office';
      case text == 'Gym':
        return 'Gym';
      case text == 'Hallway':
        return 'Hallway';
      case text == 'Toilet':
        return 'Toilet';
      case text == 'Front door':
        return 'Front door';
      case text == 'Garage':
        return 'Garage';

      case text == 'Terrace':
        return 'Terrace';
      case text == 'Garden':
        return 'Garden';
      case text == 'Driveway':
        return 'Driveway';
      case text == 'Carport':
        return 'Carport';

      default:
        return 'Other';
    }
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
};

export default util;
