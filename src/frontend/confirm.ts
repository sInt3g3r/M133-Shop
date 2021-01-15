
export async function loadConfirm() {
    await fetch(`/api/clearCart`, {method: 'PUT'});
};