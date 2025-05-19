
export function getTodayDate():string {
    // returns today's date in dd/mm/yyyy
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const todayDate = `${dd}/${mm}/${yyyy}`;
    return todayDate;
}