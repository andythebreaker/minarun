import tkinter as tk
import re

def replace_url(url, to_local):
    if to_local:
        return re.sub(r'https://gitname.github.io/minarun', r'http://192.168.0.101:48489/./', url)
    else:
        return re.sub(r'http://192.168.0.101:48489/./', r'https://gitname.github.io/minarun', url)

def replace_env(url, to_local):
    if to_local:
        return re.sub(r'NODE_ENV=production', r'set NODE_ENV=production &&', url)
    else:
        return re.sub(r'set NODE_ENV=production &&', r'NODE_ENV=production', url)

def read_package_json():
    with open('./package.json', 'r') as f:
        data = f.read()
    return data

def write_package_json(data):
    with open('./package.json', 'w') as f:
        f.write(data)

def to_local_clicked():
    package_data = read_package_json()
    modified_data = replace_url(package_data, True)
    write_package_json(modified_data)

def to_online_clicked():
    package_data = read_package_json()
    modified_data = replace_url(package_data, False)
    write_package_json(modified_data)

def to_windows():
    package_data = read_package_json()
    modified_data = replace_env(package_data, True)
    write_package_json(modified_data)

def to_linux():
    package_data = read_package_json()
    modified_data = replace_env(package_data, False)
    write_package_json(modified_data)

root = tk.Tk()
root.title('URL Modifier')

btn_to_local = tk.Button(root, text='To Local', command=to_local_clicked)
btn_to_local.pack()

btn_to_online = tk.Button(root, text='To Online', command=to_online_clicked)
btn_to_online.pack()

btn_to_local = tk.Button(root, text='to windows', command=to_windows)
btn_to_local.pack()

btn_to_online = tk.Button(root, text='to linux' , command=to_linux)
btn_to_online.pack()

root.mainloop()
