/* eslint-disable @typescript-eslint/naming-convention */

import {JivaUserService} from '@opennyai/jiva-user-api';
export const userService = (accessToken: string) => new JivaUserService({BASE: process.env.REACT_APP_API_ENDPOINT, TOKEN: accessToken});
