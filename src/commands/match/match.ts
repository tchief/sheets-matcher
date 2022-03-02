import { getProposals, getRequests } from "./sheets";
import { locationTranslations } from "./translations";
import { Match, matchesToString, Request, Proposal } from "./types";

export const getMatches = async (): Promise<Match[]> => {
    const requests = (await getRequests()).filter(filterRequests);
    const proposals = (await getProposals()).filter(filterProposals);

    const matches: Match[] = requests
        .map((request) => ({
            requestId: request.rowNumber,
            proposalIds: proposals.filter((proposal) => match(request, proposal)).map((proposal) => proposal.rowNumber),
        }))
        .filter((match) => match.proposalIds.length > 0);

    console.log({ proposals, requests, matches: matchesToString(matches) });

    return matches;
};

const matchLocation = (request: Request, proposal: Proposal): boolean => {
    if (
        request.city === proposal.city ||
        locationTranslations[proposal.city]?.includes(request.city) ||
        locationTranslations[request.city]?.includes(proposal.city)
    )
        return true;
    if (
        proposal.country === request.country ||
        locationTranslations[proposal.country]?.includes(request.country) ||
        locationTranslations[request.country]?.includes(proposal.country)
    )
        return true;
    return false;
};

const NO_ANSWERS = ["no", "ні", "нема", "немає", ""];
const matchPets = (request: Request, proposal: Proposal): boolean => {
    if (request.pets && !NO_ANSWERS.includes(request.pets) && (!proposal.pets || NO_ANSWERS.includes(proposal.pets))) return false;
    return true;
};

const match = (request: Request, proposal: Proposal): boolean =>
    matchLocation(request, proposal) && matchPets(request, proposal) && +proposal.seats >= +request.seats;

const filterRequests = (request: Request): boolean => !request.host && ["new", "Delegated to i1"].includes(request.status);
const filterProposals = (proposal: Proposal): boolean => !proposal.refugee && ["new"].includes(proposal.status);
