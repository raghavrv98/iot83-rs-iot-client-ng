module.exports = {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
        "<rootDir>/jest-setup.ts"
    ],
    "transformIgnorePatterns": [
        "node_modules/(?!@ngrx|ngx-socket-io)",
        "node_modules/(?!@amcharts/amcharts4/)"
    ],
    "transform": {
        "^.+\\.(ts|js|html)$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/cypress/",
        "<rootDir>/src/test.ts",
    ],
    "globals": {
        'ts-jest': {
            allowSyntheticDefaultImports: true,
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
        TextEncoder: TextEncoder
    },
    "roots": ['src'],
    "coverageDirectory": 'reports',
    "moduleNameMapper": {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@env': '<rootDir>/src/environments/environment'
    },
};