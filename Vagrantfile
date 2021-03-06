class FixGuestAdditions < VagrantVbguest::Installers::RedHat
    def dependencies
        packages = super
  
        # If there's no "kernel-devel" package matching the running kernel in the
        # default repositories, then the base box we're using doesn't match the
        # latest CentOS release anymore and we have to look for it in the archives...
        if communicate.test('test -f /etc/centos-release && ! yum -q info kernel-devel-`uname -r` &>/dev/null')
            env.ui.warn("[#{vm.name}] Looking for the CentOS 'kernel-devel' package in the release archives...")
            packages.sub!('kernel-devel-`uname -r`', 'http://mirror.centos.org/centos' \
                                                     '/`grep -Po \'\b\d+\.[\d.]+\b\' /etc/centos-release`' \
                                                     '/{os,updates}/`arch`/Packages/kernel-devel-`uname -r`.rpm')
        end
  
        packages
    end
  end
  
  Vagrant.configure("2") do |config|
  
      config.vm.box = "generic/centos8"
      config.vm.hostname = "master.puppet.vm"
    
      config.vm.provider "virtualbox" do |v|
        v.name = "master.puppet.vm"
        v.memory = 2048
        v.cpus = 2
      end
  
      # port forwarding
      config.vm.network :private_network, ip: "192.168.33.10"
      config.vm.network :forwarded_port, guest: 3000, host: 3000
  
      #Adding www user and group
      config.vm.provision "shell", inline: "groupadd -g 1011 www-data && useradd -r -u 1011 -g www-data www-data"
  
      #Disabling SELinux
      config.vm.provision :shell, :inline => "setenforce 0", run: "always"
      config.vm.synced_folder "api/", "/var/www/api", owner: 1011, group: 1011, smb_username: "user", smb_password: "user", mount_options: ["vers=3.02","mfsymlinks","dir_mode=0775","file_mode=0774","sec=ntlm"]
  
      config.vm.provision "puppet" do |puppet|
        puppet.manifests_path = "puppet/manifests"
        puppet.manifest_file = "nodejs.pp"
      end    
    end