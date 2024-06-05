import { VALID_REFRESH_TOKEN_100_YEARS } from '../../test/test-utils';
import { OAUTH_ACCESS_TOKEN, OAUTH_REFRESH_TOKEN, mockUser } from '../fixtures/users.fixture';
import { ROLE } from './types/role.type';
import { Users } from './users.entity';

describe('User', () => {
    it('user 정보가 주어지면 user 정보를 리턴해야 한다.', () => {
        expect(mockUser).toEqual({
            id: 1,
            nickname: 'mock_oauth_nickname#12345',
            email: 'mock_email@example.com',
            profileImageUrl: 'mock_profile_image.jpg',
            role: ROLE.User,
            mainDogId: null,
            oauthId: '12345',
            oauthAccessToken: OAUTH_ACCESS_TOKEN,
            oauthRefreshToken: OAUTH_REFRESH_TOKEN,
            refreshToken: VALID_REFRESH_TOKEN_100_YEARS,
            createdAt: expect.any(Date),
        });
    });

    it('user 정보가 없으면 빈 객체를 리턴해야 한다.', () => {
        const user = new Users({});

        expect(user).toEqual({});
    });
});
