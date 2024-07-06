export function parseFullName(fullName: string): { firstName: string, lastName: string } {
    let firstName: string = "";
    let lastName: string = "";

    if (fullName.includes(" ")) {
        const firstSpaceIndex  = fullName.indexOf(" ");
        firstName = fullName.slice(0, firstSpaceIndex );
        lastName = fullName.slice(firstSpaceIndex + 1);
    } else if (fullName.includes("-")) {
        [firstName, lastName] = fullName.split("-", 2);
    } else {
        firstName = lastName = fullName;
    }

    return { firstName, lastName };
}