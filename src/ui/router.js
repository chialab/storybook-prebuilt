import global from 'global';

const Router = global.__STORYBOOKROUTER__;

export const {
    BaseLocationProvider,
    DEEPLY_EQUAL,
    Link,
    Location,
    LocationProvider,
    Match,
    Route,
    buildArgsParam,
    deepDiff,
    getMatch,
    parsePath,
    queryFromLocation,
    queryFromString,
    stringifyQuery,
    useNavigate,
} = Router;
export default Router;
