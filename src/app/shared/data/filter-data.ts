import { SelectedFilters, FilterItem, FiltersListWithValues } from '../models/filter-items.entity';

export const FILTER_JSON: FilterItem[] = [
  {
    display: true,
    name: 'site',
    displayName: 'Site',
    subFilters: [
      {
        name: 'shellScotford',
        checked: false,
        displayName: 'Shell Scotford'
      }
    ]
  },
  {
    display: true,
    name: 'plant',
    displayName: 'Plant',
    subFilters: [
      {
        name: 'refinery',
        checked: false,
        displayName: 'Refinery'
      }
    ]
  },
  {
    display: true,
    name: 'area',
    displayName: 'Area',
    subFilters: [
      {
        name: 'hydrogenGeneration',
        checked: false,
        displayName: 'Hydrogen generation'
      },
      {
        name: 'hydrocracking',
        checked: false,
        displayName: 'Hydrocracking'
      },
      {
        name: 'utilities',
        checked: false,
        displayName: 'Utilities'
      }
    ]
  },
  {
    display: true,
    name: 'unit',
    displayName: 'Unit',
    subFilters: [
      {
        name: '21',
        checked: false,
        displayName: '21 (HTM Methane Reformer)'
      },
      {
        name: '26',
        checked: false,
        displayName: '26 (DOW H2 Compressors)'
      },
      {
        name: '22',
        checked: false,
        displayName: '22 (Hydrogen Cracker)'
      },
      {
        name: '23',
        checked: false,
        displayName: '23 (Hydrogen Cracker)'
      },
      {
        name: '51',
        checked: false,
        displayName: '51 (Refinery Utilities)'
      },
      {
        name: '56',
        checked: false,
        displayName: '56 (Glycol System)'
      }
    ]
  },
  {
    display: true,
    name: 'deviceType',
    displayName: 'Device Type',
    subFilters: [
      {
        name: 'HTC',
        checked: false,
        displayName: 'HTC'
      }
    ]
  },
  {
    display: true,
    name: 'devicePriority',
    displayName: 'Device Priority',
    subFilters: [
      {
        name: '0',
        checked: false,
        displayName: '0'
      },
      {
        name: '1',
        checked: false,
        displayName: '1'
      },
      {
        name: '2',
        checked: false,
        displayName: '2'
      },
      {
        name: '3',
        checked: false,
        displayName: '3'
      },
      {
        name: '4',
        checked: false,
        displayName: '4'
      },
      {
        name: '5',
        checked: false,
        displayName: '5'
      },
      {
        name: '6',
        checked: false,
        displayName: '6'
      },
      {
        name: '7',
        checked: false,
        displayName: '7'
      }
    ]
  },
  {
    display: true,
    name: 'onlineStatus',
    displayName: 'Online Status',
    subFilters: [
      {
        name: 'Yes',
        checked: false,
        displayName: 'Yes'
      },
      {
        name: 'No',
        checked: false,
        displayName: 'No'
      }
    ]
  },
  {
    display: true,
    name: 'alarmState',
    displayName: 'Alarm State',
    subFilters: [
      {
        name: 'Yes',
        checked: false,
        displayName: 'Yes'
      },
      {
        name: 'No',
        checked: false,
        displayName: 'No'
      }
    ]
  },
  {
    display: true,
    name: 'alarmType',
    displayName: 'AlarmType',
    subFilters: [
      {
        name: 'warning',
        checked: false,
        displayName: 'Warning'
      },
      {
        name: 'emergency',
        checked: false,
        displayName: 'Emergency'
      },
    ]
  },
  {
    display: false,
    name: 'systemNumber',
    displayName: 'System Number',
    subFilters: [
      {
        name: '21-SYS-3000',
        checked: false,
        displayName: '21-SYS-3000'
      },
      {
        name: '21-SYS-3004',
        checked: false,
        displayName: '21-SYS-3004'
      },
      {
        name: '22-SYS-3000',
        checked: false,
        displayName: '22-SYS-3000'
      },
      {
        name: '22-SYS-3004',
        checked: false,
        displayName: '22-SYS-3004'
      },
      {
        name: '23-SYS-3000',
        checked: false,
        displayName: '23-SYS-3000'
      },
      {
        name: '23-SYS-3004',
        checked: false,
        displayName: '23-SYS-3004'
      },
      {
        name: '26-SYS-3007',
        checked: false,
        displayName: '26-SYS-3007'
      },
      {
        name: '26-SYS-3008',
        checked: false,
        displayName: '26-SYS-3008'
      },
      {
        name: '51-SYS-3000',
        checked: false,
        displayName: '51-SYS-3000'
      },
      {
        name: '51-SYS-3005',
        checked: false,
        displayName: '51-SYS-3005'
      },
      {
        name: '56-SYS-3000',
        checked: false,
        displayName: '56-SYS-3000'
      },
      {
        name: '56-SYS-3005',
        checked: false,
        displayName: '56-SYS-3005'
      }
    ]
  },
  {
    display: false,
    name: 'lineNumber',
    displayName: 'Line Number',
    subFilters: [
      {
        name: '21-LINE-100',
        checked: false,
        displayName: '21-LINE-100'
      },
      {
        name: '21-LINE-101',
        checked: false,
        displayName: '21-LINE-101'
      },
      {
        name: '21-LINE-102',
        checked: false,
        displayName: '21-LINE-102'
      },
      {
        name: '22-LINE-100',
        checked: false,
        displayName: '22-LINE-100'
      },
      {
        name: '22-LINE-102',
        checked: false,
        displayName: '22-LINE-102'
      },
      {
        name: '22-LINE-104',
        checked: false,
        displayName: '22-LINE-104'
      },
      {
        name: '22-LINE-105',
        checked: false,
        displayName: '22-LINE-105'
      },
      {
        name: '23-LINE-101',
        checked: false,
        displayName: '23-LINE-101'
      },
      {
        name: '23-LINE-102',
        checked: false,
        displayName: '23-LINE-102'
      },
      {
        name: '23-LINE-103',
        checked: false,
        displayName: '23-LINE-103'
      },
      {
        name: '26-LINE-103',
        checked: false,
        displayName: '26-LINE-103'
      },
      {
        name: '26-LINE-104',
        checked: false,
        displayName: '26-LINE-104'
      },
      {
        name: '26-LINE-105',
        checked: false,
        displayName: '26-LINE-105'
      },
      {
        name: '26-LINE-106',
        checked: false,
        displayName: '26-LINE-106'
      },
      {
        name: '51-LINE-101',
        checked: false,
        displayName: '51-LINE-101'
      },
      {
        name: '51-LINE-102',
        checked: false,
        displayName: '51-LINE-102'
      },
      {
        name: '51-LINE-103',
        checked: false,
        displayName: '51-LINE-103'
      },
      {
        name: '51-LINE-104',
        checked: false,
        displayName: '51-LINE-104'
      },
      {
        name: '51-LINE-105',
        checked: false,
        displayName: '51-LINE-105'
      },
      {
        name: '51-LINE-106',
        checked: false,
        displayName: '51-LINE-106'
      },
      {
        name: '56-LINE-106',
        checked: false,
        displayName: '56-LINE-106'
      },
      {
        name: '56-LINE-108',
        checked: false,
        displayName: '56-LINE-108'
      },
      {
        name: '56-LINE-110',
        checked: false,
        displayName: '56-LINE-110'
      },
      {
        name: '56-LINE-112',
        checked: false,
        displayName: '56-LINE-112'
      },
      {
        name: '56-LINE-114',
        checked: false,
        displayName: '56-LINE-114'
      }
    ]
  },
  {
    display: false,
    name: 'lineCriticality',
    displayName: 'Line Criticality',
    subFilters: [
      {
        name: '1',
        checked: false,
        displayName: '1'
      },
      {
        name: '2',
        checked: false,
        displayName: '2'
      },
      {
        name: '3',
        checked: false,
        displayName: '3'
      },
      {
        name: '4',
        checked: false,
        displayName: '4'
      },
      {
        name: '5',
        checked: false,
        displayName: '5'
      }
    ]
  },
  {
    display: false,
    name: 'equipment',
    displayName: 'Equipment',
    subFilters: [
      {
        name: 'Pump-ABC-1',
        checked: false,
        displayName: 'Pump-ABC-1'
      },
      {
        name: 'Pump-ABC-2',
        checked: false,
        displayName: 'Pump-ABC-2'
      },
      {
        name: 'Pump-ABC-3',
        checked: false,
        displayName: 'Pump-ABC-3'
      },
      {
        name: 'Exchanger-ABC-1',
        checked: false,
        displayName: 'Exchanger-ABC-1'
      },
      {
        name: 'Exchanger-ABC-2',
        checked: false,
        displayName: 'Exchanger-ABC-2'
      },
      {
        name: 'Exchanger-ABC-3',
        checked: false,
        displayName: 'Exchanger-ABC-3'
      },
      {
        name: 'Vessel-ABC-1',
        checked: false,
        displayName: 'Vessel-ABC-1'
      },
      {
        name: 'Vessel-ABC-2',
        checked: false,
        displayName: 'Vessel-ABC-2'
      },
      {
        name: 'Vessel-ABC-3',
        checked: false,
        displayName: 'Vessel-ABC-3'
      }
    ]
  },
  {
    display: false,
    name: 'breakerPanel',
    displayName: 'Breaker Panel',
    subFilters: [
      {
        name: '21-PB-10',
        checked: false,
        displayName: '21-PB-10'
      },
      {
        name: '21-PB-11',
        checked: false,
        displayName: '21-PB-11'
      },
      {
        name: '22-PB-10',
        checked: false,
        displayName: '21-PB-10'
      },
      {
        name: '22-PB-14',
        checked: false,
        displayName: '21-PB-14'
      },
      {
        name: '23-PB-10',
        checked: false,
        displayName: '23-PB-10'
      },
      {
        name: '23-PB-11',
        checked: false,
        displayName: '23-PB-11'
      },
      {
        name: '26-PB-10',
        checked: false,
        displayName: '26-PB-10'
      },
      {
        name: '26-PB-11',
        checked: false,
        displayName: '26-PB-11'
      },
      {
        name: '51-PB-10',
        checked: false,
        displayName: '51-PB-10'
      },
      {
        name: '51-PB-16',
        checked: false,
        displayName: '51-PB-16'
      },
      {
        name: '56-PB-16',
        checked: false,
        displayName: '56-PB-16'
      },
      {
        name: '56-PB-21',
        checked: false,
        displayName: '56-PB-21'
      }
    ]
  },
  {
    display: false,
    name: 'controlPanel',
    displayName: 'Control Panel',
    subFilters: [
      {
        name: '21-HCP-10',
        checked: false,
        displayName: '21-HCP-10'
      },
      {
        name: '21-HCP-11',
        checked: false,
        displayName: '21-HCP-11'
      },
      {
        name: '21-HCP-12',
        checked: false,
        displayName: '21-HCP-12'
      },
      {
        name: '22-HCP-20',
        checked: false,
        displayName: '22-HCP-20'
      },
      {
        name: '22-HCP-21',
        checked: false,
        displayName: '22-HCP-21'
      },
      {
        name: '22-HCP-22',
        checked: false,
        displayName: '22-HCP-22'
      },
      {
        name: '23-HCP-1',
        checked: false,
        displayName: '23-HCP-1'
      },
      {
        name: '23-HCP-2',
        checked: false,
        displayName: '23-HCP-2'
      },
      {
        name: '23-HCP-3',
        checked: false,
        displayName: '23-HCP-3'
      },
      {
        name: '23-HCP-4',
        checked: false,
        displayName: '23-HCP-4'
      },
      {
        name: '23-HCP-5',
        checked: false,
        displayName: '23-HCP-5'
      },
      {
        name: '26-HCP-10',
        checked: false,
        displayName: '26-HCP-10'
      },
      {
        name: '26-HCP-9',
        checked: false,
        displayName: '26-HCP-9'
      },
      {
        name: '26-HCP-8',
        checked: false,
        displayName: '26-HCP-8'
      },
      {
        name: '51-HCP-20',
        checked: false,
        displayName: '51-HCP-20'
      },
      {
        name: '51-HCP-23',
        checked: false,
        displayName: '51-HCP-23'
      },
      {
        name: '51-HCP-24',
        checked: false,
        displayName: '51-HCP-24'
      },
      {
        name: '56-HCP-11',
        checked: false,
        displayName: '56-HCP-11'
      },
      {
        name: '56-HCP-5',
        checked: false,
        displayName: '56-HCP-5'
      },
      {
        name: '56-HCP-9',
        checked: false,
        displayName: '56-HCP-9'
      }
    ]
  },
  {
    display: false,
    name: 'outputState',
    displayName: 'Output State',
    subFilters: [
      {
        name: 'On',
        checked: false,
        displayName: 'On'
      },
      {
        name: 'Off',
        checked: false,
        displayName: 'Off'
      }
    ]
  }
];

export const FILTER_LIST_WITH_VALUES: FiltersListWithValues[] = [
  {
    name: 'site',
    filteredValues: [],
  },
  {
    name: 'plant',
    filteredValues: [],
  },
  {
    name: 'area',
    filteredValues: [],
  },
  {
    name: 'unit',
    filteredValues: [],
  },
  {
    name: 'deviceType',
    filteredValues: [],
  },
  {
    name: 'devicePriority',
    filteredValues: [],
  },
  {
    name: 'onlineStatus',
    filteredValues: [],
  },
  {
    name: 'alarmState',
    filteredValues: [],
  },
  {
    name: 'alarmType',
    filteredValues: [],
  },
  {
    name: 'systemNumber',
    filteredValues: [],
  },
  {
    name: 'lineNumber',
    filteredValues: [],
  },
  {
    name: 'lineCriticality',
    filteredValues: [],
  },
  {
    name: 'equipment',
    filteredValues: [],
  },
  {
    name: 'breakerPanel',
    filteredValues: [],
  },
  {
    name: 'controlPanel',
    filteredValues: [],
  },
  {
    name: 'outputState',
    filteredValues: [],
  },
];

export const SELECTED_FILTERS: SelectedFilters[] = [];
