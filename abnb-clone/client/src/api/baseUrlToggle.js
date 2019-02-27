let baseURL
if(window.confirm('Which server you wish \nYes- Python \nNo- ExpressJs')){
    alert('Python Selected. Enjoy!')
    baseURL = 'https://abnb-server-python-kq6oyjrse.now.sh/houses/'
}
else {
    alert('ExpressJs Selected. Enjoy!')
    baseURL = 'https://abnb-clone-server-da91mqwyt.now.sh/houses/'
}
export default baseURL