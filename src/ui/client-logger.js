import global from 'global';

const ClientLogger = global.__STORYBOOKCLIENTLOGGER__;

export const {
    logger,
    once,
    pretty,
} = ClientLogger;
export default ClientLogger;
