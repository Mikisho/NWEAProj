node nodejs {
    package {"epel-release":
      ensure => "installed"
    }

    package {"nodejs":
      ensure => "installed"
    }

    file { lookup('app_dir'):
       ensure => "directory",
       source => "puppet:///files/"
       recurse => true
    }
    exec { "Run npm against package"
      command => "/usr/bin/npm install",
      cwd     => lookup("app_dir"),
    }
    service { "node":
       ensure => "running",
       enable => true,
    }
}
