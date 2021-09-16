import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { Crypto } from '@peculiar/webcrypto';

global.crypto = new Crypto();
