<?php

namespace App\DataFixtures;

use App\Factory\CategorieFactory;
use App\Factory\ProduitFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        CategorieFactory::createMany(10);
        ProduitFactory::createMany(40, function () {
            return ['categorie' => CategorieFactory::random()];
        });
    }
}
