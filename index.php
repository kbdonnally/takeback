<?php echo head(array('bodyid'=>'home')); ?>

<div id="introduction">
<p>Take Back the Archive is a public history project created by UVa faculty, students, librarians, and archivists. It is meant to preserve, visualize, and contextualize the history of rape and sexual violence at the University of Virginia, honoring individual stories and documenting systemic issues and trends.</p>
</div>

<?php if ($homepageText = get_theme_option('Homepage Text')): ?>
<div id="homepage-text">
<?php echo $homepageText; ?>
</div>
<?php endif; ?>

<?php $exhibits = get_records('Exhibit'); ?>
<?php if (count($exhibits) > 0): ?>
<div class="exhibits">
<?php foreach ($exhibits as $exhibit): ?>
    <div class="exhibit">
        <h2><?php echo exhibit_builder_link_to_exhibit($exhibit); ?></h2>
        <?php 
        $exhibitImage = false;
        
        if ($exhibit->id == '4') {
            $exhibitImage = '<img alt="" src="'.img('exhibit-4.jpg').'">';
        } else {
            $exhibitImage = record_image($exhibit);
        }

        ?>
        <?php if ($exhibitImage): ?>
            <?php echo exhibit_builder_link_to_exhibit($exhibit, $exhibitImage, array('class' => 'image')); ?>
        <?php endif; ?>
        <?php if ($exhibitDescription = metadata($exhibit, 'description', array('no_escape' => true))): ?>
        <div class="description"><?php echo $exhibitDescription; ?></div>
        <?php endif; ?>
    </div>

<?php endforeach; ?>
</div>
<?php endif; ?>

<?php fire_plugin_hook('public_append_to_home', array('view' => $this)); ?>

<?php echo foot(); ?>
