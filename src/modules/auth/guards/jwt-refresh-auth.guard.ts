import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/common/constants';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(Constants.JwtStrategyConstants.JWT_REFRESH) { }
