import global from 'global';

const Api = global.__STORYBOOKAPI__;

export const {
    ActiveTabs,
    Consumer,
    ManagerContext,
    Provider,
    combineParameters,
    merge,
    useAddonState,
    useArgTypes,
    useArgs,
    useChannel,
    useGlobalTypes,
    useGlobals,
    useParameter,
    useSharedState,
    useStoryPrepared,
    useStorybookApi,
    useStorybookState,
} = Api;
export default Api;
