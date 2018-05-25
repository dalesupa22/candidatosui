<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit156343f9db175d1e135761d87cbdd8b8
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Twig\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Twig\\' => 
        array (
            0 => __DIR__ . '/..' . '/twig/twig/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'T' => 
        array (
            'Twig_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/twig/lib',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit156343f9db175d1e135761d87cbdd8b8::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit156343f9db175d1e135761d87cbdd8b8::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit156343f9db175d1e135761d87cbdd8b8::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}