import { fixtures } from '../helpers/fixtures';

export function isBarksiFilterAPIRequest(url: URL): boolean {
    return (
        url.pathname === fixtures.pathname &&
        url.searchParams.get('mainSlug') === 'koshkam' &&
        url.searchParams.getAll('slug').includes('igrushki') &&
        url.searchParams.getAll('slug').includes('barksi')
    );
}