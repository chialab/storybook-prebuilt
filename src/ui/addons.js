import global from 'global';

const Addons = global.__STORYBOOKADDONS__;

export const {
    AddonStore,
    Channel,
    addons,
    makeDecorator,
    isSupportedType,
    types,
    mockChannel,
    HooksContext,
    applyHooks,
    useArgs,
    useCallback,
    useChannel,
    useEffect,
    useGlobals,
    useMemo,
    useParameter,
    useReducer,
    useRef,
    useState,
    useStoryContext,
} = Addons;
export default Addons;
