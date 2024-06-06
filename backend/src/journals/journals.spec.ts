import { Journals } from './journals.entity';

describe('Journals', () => {
    it('journals가 주어지면 journals 정보를 리턴해야 한다. ', () => {
        const journals = new Journals({ id: 1, userId: 1, calories: 11 });

        expect(journals.id).toBe(1);
        expect(journals.userId).toBe(1);
        expect(journals.calories).toBe(11);
    });

    it('journals 정보가 없으면 빈 객체를 리턴해야 한다.', () => {
        const journals = new Journals({});

        expect(journals).toEqual({});
    });
});
