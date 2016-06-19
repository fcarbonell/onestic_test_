<?php

namespace AppBundle\Repositories;

use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\Products as Products;

/**
 * ActionRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProductsRepository extends EntityRepository
{
	/**
     * Get products with filters
     * 
     */  
    public function getTwelveProducts($limit, $filters){
        try{
            $where = array();
            if($filters['colors']!=''){
                $where['color'] = explode(',',$filters['colors']);
            }
            if($filters['sizes']!=''){
                $where['size'] = explode(',',$filters['sizes']);    
            }
            $products = $this->getEntityManager()->getRepository('AppBundle:Products')->findBy($where, array('position' => 'ASC'),$limit);
            return $products;
        }catch(Exception $e){
            return array();
        }
    }

	/**
     * Get sizes of products for filter
     */
    public function getAllSizes()
    {
        try{
        	$queryBuilder = $this->getEntityManager()->createQueryBuilder();
			$query = $queryBuilder
                    ->select('p.size')
                    ->distinct()
                    ->from('AppBundle:Products', 'p')
                    ->getQuery();
			$sizes = $query->getResult();
			return $sizes;
        }catch(Exception $e){
            return array();
        }
    }

    /**
     * Get colors of products for filter
     */
    public function getAllColors(){
        try{
            $queryBuilder = $this->getEntityManager()->createQueryBuilder();
            $query = $queryBuilder
                    ->select('p.color')
                    ->distinct()
                    ->from('AppBundle:Products', 'p')
                    ->getQuery();
            $colors = $query->getResult();
            return $colors;
        }catch(Exception $e){
            return array();
        }
    }
}