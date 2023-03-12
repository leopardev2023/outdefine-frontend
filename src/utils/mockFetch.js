import awsUtils from 'utils/awsUtils'

export default async function mockFetch(url) {
    const apiName = awsUtils.getAPIName();

    switch (url) {
        case apiName + '/freelancer/profile' : {
            return {
                ok: true,
                status: 200,
            };
        }
        case apiName + '/freelancer/profile/portfolio' : {
            return {
                ok: true,
                status: 200,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}