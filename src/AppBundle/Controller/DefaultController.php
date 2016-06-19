<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage") 
     */
    public function indexAction(Request $request)
    {   
        try{
            $filters = array();
            $limit = 12;
            $em = $this->getDoctrine()->getManager(); 

            //Request options http://127.0.0.1:8000/?colors=Crimson,Goldenrod,Blue&sizes=L
            $filters['colors'] = $request->query->get('colors');
            $filters['sizes'] = $request->query->get('sizes');

            //$products = $this->getProducts($em->getRepository('AppBundle:Products'),$filters);

            $products = $em->getRepository('AppBundle:Products')->getTwelveProducts($limit,$filters);

            $sizes = $em->getRepository('AppBundle:Products')->getAllSizes();

            $colors = $em->getRepository('AppBundle:Products')->getAllColors();

            return $this->render('default/index.html.twig',array('products' => $products,'sizes' => $sizes,'colors' => $colors));
        }catch(Exception $e){
            $products = $sizes = $colors = array();
            return $this->render('default/index.html.twig',array('products' => $products,'sizes' => $sizes,'colors' => $colors));
        }
        
    }

}
